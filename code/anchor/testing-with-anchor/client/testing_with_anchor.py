from solders.keypair import Keypair
from solders.system_program import ID as SYS_PROGRAM_ID

from pytest import fixture, mark
from pytest_asyncio import fixture as async_fixture
from anchorpy import Program, Provider, Context
from anchorpy.pytest_plugin import workspace_fixture
from anchorpy.workspace import WorkspaceType

workspace = workspace_fixture(".")

@fixture(scope="module")
def program(workspace: WorkspaceType) -> Program:
    """Create a Program instance."""
    return workspace["testing_with_anchor"]


@fixture(scope="module")
def provider(program: Program) -> Provider:
    """Get a Provider instance."""
    return program.provider


@async_fixture(scope="module")
async def initialized_base_account(program: Program, provider: Provider) -> Keypair:
    """Call initialize()."""
    base_account = Keypair()
    tx_sig = await program.rpc["initialize"](
        provider.wallet.public_key,
        ctx=Context(
            accounts={
                "base_account": base_account.pubkey(),
                "user": provider.wallet.public_key,
                "system_program": SYS_PROGRAM_ID,
            },
            signers=[base_account],
        ),
    )
    print(f"Your transaction signature {tx_sig}")
    return base_account


@mark.asyncio
async def test_initialized_base_account(
    initialized_base_account: Keypair,
    program: Program,
    provider: Provider,
) -> None:
    base_account = await program.account["BaseAccount"].fetch(initialized_base_account.pubkey())
    assert base_account.authority == provider.wallet.public_key
    count = base_account.count
    assert count == 0
    print(f"Count is {count}")


@mark.asyncio
async def test_increment(
    initialized_base_account: Keypair,
    program: Program,
    provider: Provider,
) -> None:
    await program.rpc["increment"](
        ctx=Context(
            accounts={
                "base_account": initialized_base_account.pubkey(),
                "authority": provider.wallet.public_key,
            },
        ),
    )
    base_account = await program.account["BaseAccount"].fetch(initialized_base_account.pubkey())
    assert base_account.authority == provider.wallet.public_key
    count = base_account.count
    assert count == 1
    print(f"Count is {count}")
