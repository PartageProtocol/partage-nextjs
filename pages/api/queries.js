import { validateEmail, validateText, validateName, getFilteredNfts, getAllNfts, getNftById, getNftComments, getHighlightedNfts, getHighlightedProviders, getAllProviders, getProviderById, getProviderNfts, postComment} from "../../helpers/api-util";
import validator from "validator";
/*
    Functions that are free to be called from the frontend, NO authentication, only call premade queries to return data from db
    Needs an upgrade to have a read only access to the db. Call through functions to protect data.
 */ 

    //`http://localhost:3000/api/queries?func=${param1}&param2=${param2}&param3=${param3}`;
    
async function handler(req, res) {
    try {
        const funcToCall = req.body.func;
        let result;
        switch(funcToCall){
            case "getFilteredNfts":
                result = await getFilteredNfts({category:req.body.category, provider: req.body.provider});
                break;
            case "getAllNfts":
                result = await getAllNfts();
                break;
            case "getNftById":
                result = await getNftById(req.body.id);
                break;
            case "getHighlightedNfts":
                result = await getHighlightedNfts();
                break;
            case "getAllProviders":
                result = await getAllProviders();
                break;
            case "getProviderById":
                result = await getProviderById(req.body.id);
                break;
            case "getProviderNfts":
                result = await getProviderNfts(req.body.provider)
                break;
            case "getHighlightedProviders":
                result = await getHighlightedProviders();
                break;
            case "postComment":
                //Validate the comment
                const sanitizedName = validateName(req.body.name);
                const sanitizedText = validateText(req.body.text);
                const validEmail = validateEmail(req.body.email);
                const nftId = parseInt(req.body.nftId);
                result = await postComment({name:sanitizedName, text:sanitizedText, email:validEmail, nftId: nftId})
                break;
            case "getNftComments":
                result = await getNftComments(req.body.id);
                break;
            default:
                result = [];
                break;
        }
        // Process the data or send a response
        res.status(200).json(result);
      } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
export default handler;
