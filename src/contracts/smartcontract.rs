// // use anchor_lang::prelude::*;

// // declare_id!("Dmzq5FqUfe3iUXLEEDAiUyWFyUcFafbSZqcNjm4otCR1");

// // use anchor_lang::prelude::*;
// // use anchor_spl::{
// //     token::{self, Token, TokenAccount, MintTo, Mint, Transfer},
// // };

// // declare_id!("7BeBY1w9NqPhqq2urhmzfK1j6xwi4kCsf6i5PF6KzNAu");

// // #[program]
// // mod video_nft_platform {
// //     use super::*;

// //     pub fn initialize(ctx: Context<Initialize> -> Result<()>) {
// //         let state = &mut ctx.accounts.state;

// //         state.counter = 0;
// //         state.metadata_uri = Vec::new();
// //         state.nft_states = Vec::new();
// //         state.owners = Vec::new();

// //         Ok(())
// //     }

// //     pub fn mint_video_nft(
// //         ctx: Context<MintVideoNFT>,
// //         metadata_uri: String,
// //         price: u64,
// //     ) -> Result<()> {
// //         let nft_account = &mut ctx.accounts.nft_account;
// //         nft_account.owner = *ctx.accounts.signer.key;
// //         nft_account.metadata_uri = metadata_uri;
// //         nft_account.price = price;
// //         nft_account.mint = *ctx.accounts.mint.to_account_info().key;

// //         let cpi_accounts = MintTo {
// //             mint: ctx.accounts.mint.to_account_info(),
// //             to: ctx.accounts.token_account.to_account_info(),
// //             authority: ctx.accounts.signer.to_account_info(),
// //         };

// //         let cpi_program = ctx.accounts.token_program.to_account_info();
// //         let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
// //         token::mint_to(cpi_ctx, 1)?;

// //         Ok(())
// //     }

// //     pub fn pay_to_watch(ctx: Context<PayToWatch>) -> Result<()> {
// //         let fee = (ctx.accounts.nft_account.price as f64 * 0.02) as u64; // 2% fee
// //         let owner_share = ctx.accounts.nft_account.price - fee;

// //         // Transfer to NFT owner
// //         let cpi_accounts = Transfer {
// //             from: ctx.accounts.payer_token_account.to_account_info(),
// //             to: ctx.accounts.owner_token_account.to_account_info(),
// //             authority: ctx.accounts.payer.to_account_info(),
// //         };

// //         let cpi_program = ctx.accounts.token_program.to_account_info();
// //         let cpi_ctx = CpiContext::new(cpi_program.clone(), cpi_accounts);
// //         token::transfer(cpi_ctx, owner_share)?;

// //         // Transfer fee to platform owner
// //         let cpi_accounts = Transfer {
// //             from: ctx.accounts.payer_token_account.to_account_info(),
// //             to: ctx.accounts.platform_token_account.to_account_info(),
// //             authority: ctx.accounts.payer.to_account_info(),
// //         };

// //         let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
// //         token::transfer(cpi_ctx, fee)?;

// //         Ok(())
// //     }
// // }

// // #[derive(Accounts)]
// // pub struct Initialize<'info> {
// //     #[account(
// //         init,
// //         payer = signer,
// //         seds = [b"state"],
// //         bump
// //     )]
// // }

// // #[derive(Accounts)]
// // pub struct MintVideoNFT<'info> {
// //     #[account(init, payer = signer, space = 8 + 32 + 200 + 8 + 32)]
// //     pub nft_account: Account<'info, NFTAccount>,
// //     #[account(mut)]/home/jayeshy14/solana/projects/video-nft/anchor/node_modules
// //     pub signer: Signer<'info>,
// //     #[account(mut)]
// //     pub mint: Account<'info, Mint>,
// //     #[account(mut)]
// //     pub token_account: Account<'info, TokenAccount>,
// //     pub token_program: Program<'info, Token>,
// //     pub system_program: Program<'info, System>,
// //     pub rent: Sysvar<'info, Rent>,
// // }

// // #[derive(Accounts)]
// // pub struct PayToWatch<'info> {
// //     #[account(mut)]
// //     pub nft_account: Account<'info, NFTAccount>,
// //     #[account(mut)]
// //     pub payer: Signer<'info>,
// //     #[account(mut)]
// //     pub payer_token_account: Account<'info, TokenAccount>,
// //     #[account(mut)]
// //     pub owner_token_account: Account<'info, TokenAccount>,
// //     #[account(mut)]
// //     pub platform_token_account: Account<'info, TokenAccount>,
// //     pub token_program: Program<'info, Token>,
// // }

// // #[account]
// // pub struct NFTAccount {
// //     pub owner: Pubkey,
// //     pub metadata_uri: String,
// //     pub price: u64,
// //     pub mint: Pubkey,
// // }


// use anchor_lang::prelude::*;
// use anchor_spl::{
//     associated_token::AssociatedToken,
//     token::{self, Mint, MintTo, Token, TokenAccount, Transfer},
// };

// declare_id!("Dmzq5FqUfe3iUXLEEDAiUyWFyUcFafbSZqcNjm4otCR1");

// #[program]
// pub mod solana_nft_anchor {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         Ok(())
//     }

//     pub fn mint_video_nft(
//         ctx: Context<MintVideoNFT>,
//         metadata_uri: String,
//         price: u64,
//     ) -> Result<()> {
//         let nft_account = &mut ctx.accounts.nft_account;

//         nft_account.owner = *ctx.accounts.signer.key;
//         nft_account.metadata_uri = metadata_uri.clone();
//         nft_account.price = price;
//         nft_account.mint = *ctx.accounts.mint.to_account_info().key;

//         let cpi_accounts = MintTo {
//             mint: ctx.accounts.mint.to_account_info(),
//             to: ctx.accounts.token_account.to_account_info(),
//             authority: ctx.accounts.signer.to_account_info(),
//         };

//         let cpi_program = ctx.accounts.token_program.to_account_info();
//         let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
//         token::mint_to(cpi_ctx, 1)?;

//         Ok(())
//     }

//     pub fn pay_to_watch(ctx: Context<PayToWatch>) -> Result<()> {
//         let fee = (ctx.accounts.nft_account.price as f64 * 0.02) as u64; // 2% fee
//         let owner_share = ctx.accounts.nft_account.price - fee;

//         // Transfer to NFT owner
//         let cpi_accounts = Transfer {
//             from: ctx.accounts.payer_token_account.to_account_info(),
//             to: ctx.accounts.owner_token_account.to_account_info(),
//             authority: ctx.accounts.payer.to_account_info(),
//         };

//         let cpi_program = ctx.accounts.token_program.to_account_info();
//         let cpi_ctx = CpiContext::new(cpi_program.clone(), cpi_accounts);
//         token::transfer(cpi_ctx, owner_share)?;

//         // Transfer fee to platform owner
//         let cpi_accounts = Transfer {
//             from: ctx.accounts.payer_token_account.to_account_info(),
//             to: ctx.accounts.platform_token_account.to_account_info(),
//             authority: ctx.accounts.payer.to_account_info(),
//         };

//         let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
//         token::transfer(cpi_ctx, fee)?;

//         Ok(())
//     }
// }

// #[account]
// pub struct NFTAccount {
//     pub owner: Pubkey,
//     pub metadata_uri: String,
//     pub price: u64,
//     pub mint: Pubkey,
// }


// #[derive(Accounts)]
// pub struct Initialize<'info> {
//     /// CHECK: ok, we are passing in this account ourselves
//     #[account(mut, signer)]
//     pub signer: AccountInfo<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct MintVideoNFT<'info> {
//     #[account(init, payer = signer, space = 8 + 32 + 200 + 8 + 32 + 4)]
//     pub nft_account: Account<'info, NFTAccount>,
//     /// CHECK: ok, we are passing in this account ourselves
//     #[account(mut, signer)]
//     pub signer: AccountInfo<'info>,
//     #[account(
//         init,
//         payer = signer,
//         mint::decimals = 0,
//         mint::authority = signer.key(),
//         mint::freeze_authority = signer.key(),
//     )]
//     pub mint: Account<'info, Mint>,
//     #[account(
//         init_if_needed,
//         payer = signer,
//         associated_token::mint = mint,
//         associated_token::authority = signer,
//     )]
//     pub token_account: Account<'info, TokenAccount>,

//     pub token_program: Program<'info, Token>,
//     pub associated_token_program: Program<'info, AssociatedToken>,
//     pub system_program: Program<'info, System>,
//     pub rent: Sysvar<'info, Rent>,
// }

// #[derive(Accounts)]
// pub struct PayToWatch<'info> {
//     #[account(mut)]
//     pub nft_account: Account<'info, NFTAccount>,
//     #[account(mut)]
//     pub payer: Signer<'info>,
//     #[account(mut)]
//     pub payer_token_account: Account<'info, TokenAccount>,
//     #[account(mut)]
//     pub owner_token_account: Account<'info, TokenAccount>,
//     #[account(mut)]
//     pub platform_token_account: Account<'info, TokenAccount>,
//     pub token_program: Program<'info, Token>,
// }
// use anchor_lang::prelude::*;
// use anchor_spl::{
//     associated_token::AssociatedToken,
//     token::{self, Mint, MintTo, Token, TokenAccount, Transfer},
// };
// use borsh::{BorshDeserialize, BorshSerialize};

// declare_id!("8zd8SR11prvsNrSfsgyrn3qnUyQnSUMszqNnnbq1KErJ");
// //Dmzq5FqUfe3iUXLEEDAiUyWFyUcFafbSZqcNjm4otCR1
// #[program]
// pub mod solana_nft_anchor {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         let state = &mut ctx.accounts.state;

//         state.counter = 0;
//         state.metadata_uri = Vec::new();
//         state.owners = Vec::new();
//         state.nft_states = Vec::new();
//         state.nft_prices = Vec::new();
//         state.nft_mints = Vec::new();

//         Ok(())
//     }

//     pub fn mint_video_nft(
//         ctx: Context<MintVideoNFT>,
//         metadata_uri: String,
//         price: u64,
//     ) -> Result<()> {
//         let state = &mut ctx.accounts.state;
        
//         let nft_index = state.counter as usize;
//         state.metadata_uri.push(metadata_uri.clone().into_bytes());
//         state.owners.push(ctx.accounts.signer.key().to_bytes());
//         state.nft_states.push(0);

//         let cpi_accounts = MintTo {
//             mint: ctx.accounts.mint.to_account_info(),
//             to: ctx.accounts.token_account.to_account_info(),
//             authority: ctx.accounts.signer.to_account_info(),
//         };

//         let cpi_program = ctx.accounts.token_program.to_account_info();
//         let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
//         token::mint_to(cpi_ctx, 1)?;

//         // Update NFT state to store price
//         state.nft_prices.push(price);
//         state.nft_mints.push(*ctx.accounts.mint.to_account_info().key);
        
//         state.counter += 1;

//         Ok(())
//     }

//     pub fn pay_to_watch(ctx: Context<PayToWatch>, nft_index: u32) -> Result<()> {
//         let state = &mut ctx.accounts.state;
//         let price = state.nft_prices[nft_index as usize];
//         let fee = (price as f64 * 0.02) as u64; // 2% fee
//         let owner_share = price - fee;

//         // Transfer to NFT owner
//         let cpi_accounts = Transfer {
//             from: ctx.accounts.payer_token_account.to_account_info(),
//             to: ctx.accounts.owner_token_account.to_account_info(),
//             authority: ctx.accounts.payer.to_account_info(),
//         };

//         let cpi_program = ctx.accounts.token_program.to_account_info();
//         let cpi_ctx = CpiContext::new(cpi_program.clone(), cpi_accounts);
//         token::transfer(cpi_ctx, owner_share)?;

//         // Transfer fee to platform owner
//         let cpi_accounts = Transfer {
//             from: ctx.accounts.payer_token_account.to_account_info(),
//             to: ctx.accounts.platform_token_account.to_account_info(),
//             authority: ctx.accounts.payer.to_account_info(),
//         };

//         let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
//         token::transfer(cpi_ctx, fee)?;

//         Ok(())
//     }

//     pub fn get_counter(ctx: Context<GetCounter>) -> Result<u32> {
//         let state = &ctx.accounts.state;
//         Ok(state.counter)
//     }
// }

// #[account]
// pub struct State {
//     pub counter: u32,
//     pub metadata_uri: Vec<Vec<u8>>,
//     pub owners: Vec<[u8; 32]>,
//     pub nft_states: Vec<u8>,
//     pub nft_prices: Vec<u64>, // Added to store prices of NFTs
//     pub nft_mints: Vec<Pubkey>, // Added to store mint accounts of NFTs
// }

// impl State {
//     pub const LEN: usize = 8 + 
//         4 + 
//         4 + 
//         4 + 
//         32 * 100 + 
//         32 * 100 + 
//         1 * 100 + 
//         8 * 100 + // Space for prices
//         32 * 100; // Space for mint accounts
// }

// #[derive(Accounts)]
// pub struct Initialize<'info> {
//     #[account(init, payer = signer, space = State::LEN,
//               seeds = [b"state"],
//               bump)]
//     pub state: Account<'info, State>,
//     /// CHECK: ok, we are passing in this account ourselves
//     #[account(mut, signer)]
//     pub signer: AccountInfo<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct MintVideoNFT<'info> {
//     #[account(mut)]
//     pub state: Account<'info, State>,
//     /// CHECK: ok, we are passing in this account ourselves
//     #[account(mut, signer)]
//     pub signer: AccountInfo<'info>,
//     #[account(
//         init,
//         payer = signer,
//         mint::decimals = 0,
//         mint::authority = signer.key(),
//         mint::freeze_authority = signer.key(),
//     )]
//     pub mint: Account<'info, Mint>,
//     #[account(
//         init_if_needed,
//         payer = signer,
//         associated_token::mint = mint,
//         associated_token::authority = signer,
//     )]
//     pub token_account: Account<'info, TokenAccount>,

//     pub token_program: Program<'info, Token>,
//     pub associated_token_program: Program<'info, AssociatedToken>,
//     pub system_program: Program<'info, System>,
//     pub rent: Sysvar<'info, Rent>,
// }

// #[derive(Accounts)]
// pub struct PayToWatch<'info> {
//     #[account(mut)]
//     pub state: Account<'info, State>,
//     #[account(mut)]
//     pub payer: Signer<'info>,
//     #[account(mut)]
//     pub payer_token_account: Account<'info, TokenAccount>,
//     #[account(mut)]
//     pub owner_token_account: Account<'info, TokenAccount>,
//     #[account(mut)]
//     pub platform_token_account: Account<'info, TokenAccount>,
//     pub token_program: Program<'info, Token>,
// }

// #[derive(Accounts)]
// pub struct GetCounter<'info> {
//     pub state: Account<'info, State>,
// }


// use anchor_lang::prelude::*;

// declare_id!("CRjLbh8evvpqsimswR1BFzrmYp77xqYEpKysaQBGEEqk");

use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{mint_to, Mint, MintTo, Token, TokenAccount},
};
use borsh::{BorshDeserialize, BorshSerialize};

declare_id!("CRjLbh8evvpqsimswR1BFzrmYp77xqYEpKysaQBGEEqk");

#[program]
pub mod solana_nft_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;

        state.counter = 0;
        state.metadata_uri = Vec::new();
        state.owners = Vec::new();
        state.nft_states = Vec::new();

        Ok(())
    }

    pub fn init_nft(ctx: Context<InitNFT>, _metadata_uri: String) -> Result<()> {
        let state = &mut ctx.accounts.state;
        // let token_id = state.counter;

        // create mint account
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.associated_token_account.to_account_info(),
                authority: ctx.accounts.signer.to_account_info(),
            },
        );

        mint_to(cpi_context, 1)?;

        // update state
        state.counter += 1;
        state.metadata_uri.push(_metadata_uri.into_bytes());
        state.owners.push(ctx.accounts.signer.key().to_bytes());
        state.nft_states.push(0); // this represents 'Minted'

        Ok(())
    }

    pub fn get_owners(ctx: Context<GetCounter>) -> Result<Vec<[u8; 32]>> {
        let state = &ctx.accounts.state;
        Ok(state.owners.clone())
    }

    pub fn get_nft_states(ctx: Context<GetCounter>) -> Result<Vec<u8>> {
        let state = &ctx.accounts.state;
        Ok(state.nft_states.clone())
    }

    pub fn get_metadatauri(ctx: Context<GetCounter>) -> Result<Vec<Vec<u8>>> {
        let state = &ctx.accounts.state;
        Ok(state.metadata_uri.clone())
    }

    pub fn get_counter(ctx: Context<GetCounter>) -> Result<u32> {
        let state = &ctx.accounts.state;
        Ok(state.counter)
    }
}

#[account]
/*
1. metadata URI: Vec<Vec<u8>>
Suppose we have 3 NFTs with the following metadata URIs:
-> "https://example.com/nft1"
-> "https://example.com/nft2"
-> "https://example.com/nft3"
These would be stored in 'metadata_uri' like this:
```
metadata_uri = [    
    vec![104, 116, 116, 112, 115, 58, 47, 47, 101, 120, 97, 109, 112, 108, 101, 46, 99, 111, 109, 47, 110, 102, 116, 49],
    vec![104, 116, 116, 112, 115, 58, 47, 47, 101, 120, 97, 109, 112, 108, 101, 46, 99, 111, 109, 47, 110, 102, 116, 50],
    vec![104, 116, 116, 112, 115, 58, 47, 47, 101, 120, 97, 109, 112, 108, 101, 46, 99, 111, 109, 47, 110, 102, 116, 51]
]
```

2. owners: Vec<[u8; 32]>
Suppose we have 3 NFTs with the following public keys:
-> 'Pubkey1' represented as '[1, 2, 3, ..., 32]'
-> 'Pubkey2' represented as '[33, 34, 35, ..., 64]'
-> 'Pubkey3' represented as '[65, 66, 67, ..., 96]'
These would be stored in 'owners' like this:
```
owners = [
    [1, 2, 3, ..., 32],
    [33, 34, 35, ..., 64],
    [65, 66, 67, ..., 96]
]
```

3. nft_states: Vec<u8>
Suppose we have 3 NFTs with the following states:
-> 0(Minted)
-> 1(Bought)
-> 0(Minted)
These would be stored in 'nft_states' like this:
```
nft_states = [
    0,
    1,
    0
]
```
*/
pub struct State {
    pub counter: u32,
    pub metadata_uri: Vec<Vec<u8>>,
    pub owners: Vec<[u8; 32]>,
    pub nft_states: Vec<u8>,
}

impl State {
    pub const LEN: usize = 8 + 
        4 + // counter
        4 + // length of metadata_uri
        4 + // length of owners
        4 + // length of nft_states
        32 * 100 + // Assume a maximum of 1000 metadata URIs
        32 * 100 + // Assume a maximum of 1000 owners
        1 * 100 // Assume a maximum of 1000 NFT states
    ;
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init, 
        payer = signer, 
        space = State::LEN,
        seeds = [b"state"],
        bump)]
    pub state: Account<'info, State>,
    /// CHECK: ok, we are passing in this account ourselves
    #[account(mut, signer)]
    pub signer: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitNFT<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
    /// CHECK: ok, we are passing in this account ourselves
    #[account(mut, signer)]
    pub signer: AccountInfo<'info>,
    #[account(
        init,
        payer = signer,
        mint::decimals = 0,
        mint::authority = signer.key(),
        mint::freeze_authority = signer.key(),
        seeds = [b"mint", signer.key().as_ref(), state.counter.to_le_bytes().as_ref()],
        bump,
    )]
    pub mint: Account<'info, Mint>,
    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = mint,
        associated_token::authority = signer,
    )]
    pub associated_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct GetCounter<'info> {
    pub state: Account<'info, State>,
}