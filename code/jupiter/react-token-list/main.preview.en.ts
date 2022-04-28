const [tokens, setTokens] = useState<Token[]>([]);
useEffect(() => {
  // Fetch token list from Jupiter API
  fetch(TOKEN_LIST_URL[ENV])
    .then((response) => response.json())
    .then((result) => setTokens(result));
}, []);
