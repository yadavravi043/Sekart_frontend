import { categoryConstansts } from "../constant/constant";

const initState = {
    categories: [],
    loading: false,
    error: null
};
//categories->our old state categories
//category-> new category which we want to push
//this function add categories without refreshing page
const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }
    
    for(let cat of categories){
       //move on all catogories where parentid match add there 
        if(cat._id == parentId){
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, [...cat.children,{ 
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
            }],category):[]
        })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }

        
    }


    return myCategories;
}
export const categoryReducer=(state = initState, action) => {
    switch(action.type){
        case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            //pass new cat parentid ,all catogories,new catogory
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            console.log("updated cat",updatedCategories)
            
            state = {
                ...state,
                categories: updatedCategories,
                loading: false,
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error
            }
            break;
    //     case categoryConstansts.UPDATE_CATEGORIES_REQUEST:
    //         state = {
    //             ...state,
    //             loading: true
    //         }
    //         break;
    //     case categoryConstansts.UPDATE_CATEGORIES_SUCCESS:
    //         state = {
    //             ...state,
    //             loading: false
    //         }
    //         break;
    //     case categoryConstansts.UPDATE_CATEGORIES_FAILURE:
    //         state = {
    //             ...state,
    //             error: action.payload.error,
    //             loading: false
    //         }
    //         break;
    //     case categoryConstansts.DELETE_CATEGORIES_REQUEST:
    //         state = {
    //             ...state,
    //             loading: true
    //         }
    //         break;
    //     case categoryConstansts.DELETE_CATEGORIES_SUCCESS:
    //         state = {
    //             ...state,
    //             loading: false
    //         }
    //         break;
    //     case categoryConstansts.DELETE_CATEGORIES_FAILURE:
    //         state = {
    //             ...state,
    //             loading: false,
    //             error: action.payload.error
    //         }
    //         break;
     }

    return state;
}