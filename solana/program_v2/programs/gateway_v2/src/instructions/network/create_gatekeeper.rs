use anchor_lang::prelude::*;

use crate::constants::GATEKEEPER_SEED;
use crate::errors::{GatekeeperErrors, NetworkErrors};
use crate::state::gatekeeper::{Gatekeeper, GatekeeperFees, GatekeeperState};
use crate::state::{GatekeeperAuthKey, GatekeeperNetwork, NetworkKeyFlags};
use crate::util::check_gatekeeper_auth_threshold;

pub fn create_gatekeeper(
    ctx: Context<CreateGatekeeperAccount>,
    data: CreateGatekeeperData,
) -> Result<()> {
    let subject = &mut ctx.accounts.subject;
    let gatekeeper = &mut ctx.accounts.gatekeeper;
    let network = &mut ctx.accounts.network;
    let staking_account = &ctx.accounts.staking_account;
    let auth_keys = data.auth_keys;

    require!(
        check_gatekeeper_auth_threshold(&auth_keys, data.auth_threshold),
        GatekeeperErrors::InsufficientAuthKeys
    );

    gatekeeper.subject = *subject.key;
    gatekeeper.gatekeeper_bump = *ctx.bumps.get("gatekeeper").unwrap();
    gatekeeper.gatekeeper_network = network.key();
    gatekeeper.staking_account = staking_account.key();
    gatekeeper.token_fees = data.token_fees;
    gatekeeper.auth_threshold = data.auth_threshold;
    gatekeeper.auth_keys = auth_keys;
    gatekeeper.gatekeeper_state = GatekeeperState::Active;

    network.gatekeepers.push(gatekeeper.key());

    Ok(())
}

/// Data for [`CreateGatekeeper`]
#[derive(Debug, AnchorSerialize, AnchorDeserialize)]
pub struct CreateGatekeeperData {
    // Fees for the gatekeeper
    pub token_fees: Vec<GatekeeperFees>,
    pub auth_threshold: u8,
    pub auth_keys: Vec<GatekeeperAuthKey>,
}

#[derive(Accounts, Debug)]
#[instruction(data: CreateGatekeeperData)]
pub struct CreateGatekeeperAccount<'info> {
    #[account(
    init,
    payer = payer,
    space = Gatekeeper::size(
    data.token_fees.len(),
    data.auth_keys.len(),
    ),
    seeds = [GATEKEEPER_SEED, subject.key().as_ref(), network.key().as_ref()],
    bump
    )]
    pub gatekeeper: Account<'info, Gatekeeper>,
    pub authority: Signer<'info>,
    pub subject: SystemAccount<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
    mut,
    realloc = GatekeeperNetwork::size(
    network.fees.len(),
    network.auth_keys.len(),
    network.gatekeepers.len() + 1,
    network.supported_tokens.len(),
    ),
    realloc::payer = payer,
    realloc::zero = false,
    constraint = network.can_access(& authority, NetworkKeyFlags::CREATE_GATEKEEPER) @ NetworkErrors::InsufficientAccessCreateGatekeeper,
    )]
    pub network: Account<'info, GatekeeperNetwork>,
    #[account(mut)]
    /// CHECK: Add Checking Later
    pub staking_account: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}
