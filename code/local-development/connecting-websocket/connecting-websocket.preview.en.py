async with connect("wss://api.devnet.solana.com") as websocket:
    # Create a Test Wallet
    wallet = Keypair()
    # Subscribe to the Test wallet to listen for events
    await websocket.account_subscribe(wallet.pubkey())
    # Capture response from account subscription 
    first_resp = await websocket.recv()
    print("Subscription successful with id {}, listening for events \n".format(first_resp.result))
    updated_account_info = await websocket.recv()
    print(updated_account_info)    