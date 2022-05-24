const [tokens, setTokens] = useState<Token[]>([]);
useEffect(() => {
  fetch(TOKEN_LIST_URL[ENV])
    .then((response) => response.json())
    .then((result) => setTokens(result));
}, []);
