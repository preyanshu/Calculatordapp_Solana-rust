import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Mycalculatordapp } from "../target/types/mycalculatordapp";
import { assert } from "chai";


describe("mycalculatordapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();

  const program = anchor.workspace.Mycalculatordapp;

  it("Is initialized!", async () => {
    await program.methods.create("Welcome to Solana").accounts({
      calculator: calculator.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([calculator]).rpc();

    // Fetch the account data
    const account = await program.account.calculator.fetch(calculator.publicKey);

    // Verify the account state
    assert.strictEqual(account.greeting, "Welcome to Solana");
  });

  it("Adds two numbers!", async () => {
    await program.methods.add(new anchor.BN(5), new anchor.BN(3)).accounts({
      calculator: calculator.publicKey,
    }).rpc();

    // Fetch the account data
    const account = await program.account.calculator.fetch(calculator.publicKey);

    // Verify the account state
    assert.isTrue(account.result.eq(new anchor.BN(8))); 
  });

  it("Subtracts two numbers!", async () => {
    await program.methods.subtract(new anchor.BN(5), new anchor.BN(3)).accounts({
      calculator: calculator.publicKey,
    }).rpc();

    // Fetch the account data
    const account = await program.account.calculator.fetch(calculator.publicKey);

    // Verify the account state
    assert.isTrue(account.result.eq(new anchor.BN(2))); 
  }
  );
  it("Multiplies two numbers!", async () => {
    await program.methods.multiply(new anchor.BN(5), new anchor.BN(3)).accounts({
      calculator: calculator.publicKey,
    }).rpc();

    // Fetch the account data
    const account = await program.account.calculator.fetch(calculator.publicKey);

    // Verify the account state
    assert.isTrue(account.result.eq(new anchor.BN(15))); 
  }
  );

  it("Divides two numbers!", async () => {
    await program.methods.divide(new anchor.BN(5), new anchor.BN(3)).accounts({
      calculator: calculator.publicKey,
    }).rpc();

    // Fetch the account data
    const account = await program.account.calculator.fetch(calculator.publicKey);

    // Verify the account state
    assert.isTrue(account.result.eq(new anchor.BN(1))); 
  }
);
});
