import validator from "validator";

const authToken = process.env.DB_AUTH_TOKEN;
const urlBegin = process.env.NEXTAUTH_URL;

/*
  To be called only in other APIs, do not give direct access to users.
*/

/**
 * 
 * @param {Object} bodyObject - {collection:"x", filtersArray:, document:, colsToReturn, callType} depending on the call 
 */
async function callAPI(bodyObject){
  const url = `${urlBegin}/api/queries_direct`; 
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
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


export async function postComment(comment) {
  const commentId = await callAPI({collection:"comments", filter:comment, callType:"insert"})
  return commentId;
  }
export async function getNftComments(id) {
  const nftComments = await callAPI({collection:"comments", filtersArray:[{colName:"nftId", operator:"=", value:id.toString()}], colsToReturn:[], callType:"get"})
  return nftComments
  }

export async function deleteComment(commentId) {
    const commentIdOrError = await callAPI({collection:"comments", filtersArray:[{colName:"id", operator:"=", value:commentId.toString()}], callType:"delete"})
    return commentIdOrError;
  }

export async function getAllNfts() {
  const allNfts = await callAPI({collection:"nfts", filtersArray:[], colsToReturn:[], callType:"get"})
  return allNfts
  }
  
  export async function getHighlightedNfts() {
    const highlightedNfts = await callAPI({collection:"nfts", filtersArray:[{colName:"isHighlighted", operator:"=", value:"1"}], colsToReturn:[], callType:"get"})
    return highlightedNfts;
  }
  
  export async function getNftById(id) {
    const nftById = await callAPI({collection:"nfts", filtersArray:[{colName:"id", operator:"=", value:id.toString()}], colsToReturn:[], callType:"get"})
    return nftById;
  }
  
  export async function getFilteredNfts(searchFilter) {
    const filteredNfts = await callAPI({collection:"nfts", filtersArray:[{
      colName:"category", operator:"=", value: searchFilter.category, word:"AND"}, {
      colName:"provider", operator:"=", value:searchFilter.provider}], 
      colsToReturn:[], callType:"get"})
    return filteredNfts;
  }
  
  export async function getAllProviders() {
    const allProviders = await callAPI({collection:"providers", filtersArray:[], colsToReturn:[], callType:"get"})

    return allProviders
  }
  
  export async function getHighlightedProviders() {
    const highlightedProviders = await callAPI({collection:"providers", filtersArray:[{colName:"isHighlighted", operator: "=", value:"1"}], colsToReturn:[], callType:"get"})
    return highlightedProviders;
  }
  
  export async function getProviderById(id) {
    const providerById = await callAPI({collection:"providers", filtersArray:[{colName:"id", operator:"=", value:id.toString()}], colsToReturn:[], callType:"get"})
    return providerById;
  }
  
  export async function getProviderNfts(provider) {
    const nftsByProvider = await callAPI({collection:"nfts", filtersArray:[{colName:"provider", operator:"=", value:provider}], colsToReturn:[], callType:"get"})
    return nftsByProvider;
  }

  export async function getUserByEmail(email) {
    const userByEmail = await callAPI({collection:"users", filtersArray:[{colName:"email", operator:"=", value:email}], colsToReturn:[], callType:"get"})
    return userByEmail;
  }
  export async function createUser(details) {
    const userByEmail = await callAPI({collection:"users", filter:details, callType:"insert"})
    return userByEmail;
  }
  export async function changePassword(emailAndPassword) {
    const updatedUser = await callAPI({collection:"users", filtersArray:[{colName:"email", operator:"=", value:emailAndPassword.email}], changes:{password:emailAndPassword.password}, callType:"update"})
    return updatedUser;
  }
  export async function subNewsletter(email) {
    const newSubscribor = await callAPI({collection:"newsletter", filter:{email:email}, callType:"insert"})
    return newSubscribor;
  }

/**
 * 
 * @param {string} email 
 * @returns valid email or ""
 */
export function validateEmail(email){
  if(!validator.isEmail(email)){
    return "";
  }
  return email;
}

/**
 * 
 * @param {string} text 
 * @returns sanitized text or ""
 */
export function validateText(text){
  if(!text ||
      text.length > 500 ||
      text.trim() === ""){
        return ""
      }
    const sanitizedText = (validator.escape(validator.trim(text)))
    return sanitizedText;
}

/**
 * 
 * @param {string} name 
 * @returns sanitized name or ""
 */
export function validateName(name){
  if(!name ||
      name.length > 25 ||
      name.trim() === ""){
        return ""
      }
    const sanitizedName = (validator.escape(validator.trim(name)));
    return sanitizedName;
}