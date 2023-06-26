const urlBegin = process.env.NEXTAUTH_URL;


async function callAPI(bodyObject){
    const url = `${urlBegin}/api/queries`; 
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObject),
      });
  
      // Check the response status
      if (response.ok) {
        const data = await response.json();
        // Process the response data
        return data
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      return error
    }
  }

/**
 * 
 * @returns {[[{provider}]]}
 */
export async function getAllProviders(){
  const providers = await callAPI({func:"getAllProviders"})
  return providers;
}
/**
 * 
 * @param {string} provider - name of the provider
 * @returns {[[{nft}]]}
 */
export async function getProviderNfts(provider){
    const providerNfts = await callAPI({func:"getProviderNfts", provider:provider})
    return providerNfts;
}
/**
 * 
 * @returns {[[{nft}]]}
 */
export async function getAllNfts(){
    const allNfts = await callAPI({func:"getAllNfts"})
    return allNfts;
}
/**
 * 
 * @param {number} id 
 * @returns {[[{nft}]]}
 */
export async function getNftById(id){
    const nftById = await callAPI({func:"getNftsById", id:id})
    return nftById;
}

/**
 * 
 * @returns {[[{nft}]]}
 */
export async function getHighlightedNfts(){
    const highlightedNfts= await callAPI({func:"getHighlightedNfts"})
    return highlightedNfts;
}


