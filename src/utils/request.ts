export async function graphqlRequest<T>(
  endpoint: string,
  {
    query,
    variables,
  }: {
    query: string;
    variables: Record<string, unknown>;
  }
) {
  const body = JSON.stringify({ query, variables });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-type': 'application/json', Accept: 'application/json' },
    body,
  });

  const { data } = await response.json();
  return data as T;
}
