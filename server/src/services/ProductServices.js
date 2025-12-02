const ProductModel = require('../models/ProductModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const ListAllProduct = async (next) => {
    try {
        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category'}}
        const UnwindCategoryStage = {$unwind: '$category'}
        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        const ProjectionStage ={$project: {_id: 1, name: 1, description: 1, price: 1, discount: 1, remark: 1, image: 1, 'category._id': 1, 'category.categoryName': 1, 'brand._id': 1, 'brand.brandName': 1}}

        const data = await ProductModel.aggregate([
                JoinWithCategoryStage,
                UnwindCategoryStage,
                JoinWithBrandStage,
                UnwindBrandStage,
                ProjectionStage

        ])

        return {success: true, data: data}
    } catch (error) {
        next(error)
    }
}

const ListByBrandService = async(req, next) => {
    
    try {
        const BrandID = new ObjectId(req.params.BrandID)
        const MatchStage = {$match: {brandID: BrandID}}
        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand'}}
        const JoinWihtCategoryStage = {$lookup: {from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        const UnwindCategoryStage = {$unwind: '$category'}
        const ProjectionStage = {$project: {_id:1,name: 1, description: 1, price: 1,discount: 1, image:1, remark:1,
                discountPrice: { $subtract: [ "$price", { $multiply: ["$price", { $divide: ["$discount", 100] }] } ] },
                'category._id': 1,'category.categoryName': 1,'brand._id': 1,'brand.brandName': 1}}

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWihtCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        
        return {success: true, data: data}
    } catch (error) {
        next(error)
    }
}
const ListByCategoryService = async(req, next) => {
    try {
        const CategoryID = new ObjectId(req.params.CategoryID) 
        const MatchStage = {$match: {categoryID: CategoryID}}
        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandID',foreignField: '_id',as: 'brand'}}
        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'categoryID',foreignField: '_id',as: 'category'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        const UnwindCategoryStage = {$unwind: '$category'}
        const ProjectionStage = {$project: {_id:1,name: 1, description: 1, price: 1,discount: 1, image:1, remark:1,
                discountPrice: { $subtract: [ "$price", { $multiply: ["$price", { $divide: ["$discount", 100] }] } ] },
                'category._id': 1,'category.categoryName': 1,'brand._id': 1,'brand.brandName': 1}}

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])

        return {success: true, data: data}
    } catch (error) {
        next(error)
    }
}
const ListByRemarkService = async(req, next) => {
    try {
        const Remark = req.params.Remark
        const MatchStage = {$match: {remark: Remark}}
        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandID',foreignField: '_id',as: 'brand'}}
        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'categoryID',foreignField: '_id',as: 'category'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        const UnwindCategoryStage = {$unwind: '$category'}
        const ProjectionStage = {$project: {_id:1,name: 1, description: 1, price: 1,discount: 1, image:1, remark:1,
                discountPrice: { $subtract: [ "$price", { $multiply: ["$price", { $divide: ["$discount", 100] }] } ] },
                'category._id': 1,'category.categoryName': 1,'brand._id': 1,'brand.brandName': 1}}

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])

        return {success: true, data: data}
    } catch (error) {
        next(error)
    }
}


const ListBySimilarService = async(req, next) => {
    try {
        const CategoryID = new ObjectId(req.params.CategoryID) 
        const MatchStage = {$match: {categoryID: CategoryID}}
        const limitStage = {$limit: 20}
        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandID',foreignField: '_id',as: 'brand'}}
        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'categoryID',foreignField: '_id',as: 'category'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        const UnwindCategoryStage = {$unwind: '$category'}
        const ProjectionStage = {$project: {_id:1,name: 1, description: 1, price: 1,discount: 1, image:1, remark:1,
                discountPrice: { $subtract: [ "$price", { $multiply: ["$price", { $divide: ["$discount", 100] }] } ] },
                'category._id': 1,'category.categoryName': 1,'brand._id': 1,'brand.brandName': 1}}

        const data = await ProductModel.aggregate([
            MatchStage,
            limitStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])

        return {success: true, data: data}
    } catch (error) {
        next(error)
    }
}
const DetailsService = async(req, next) => {
    try {
        const ProductID = new ObjectId( req.params.ProductID)

          // validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(ProductID)) {
                const err = new Error("Invalid Product ID");
                err.status = 400;
                return next(err);
            }
        const MatchStage = {$match:{_id: ProductID}}
        
        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandID',foreignField: '_id',as: 'brand'}}
        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'categoryID',foreignField: '_id',as: 'category'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        const UnwindCategoryStage = {$unwind: '$category'}
        const ProjectionStage = {$project: {_id:1,name: 1, description: 1, price: 1,discount: 1, image:1, remark:1,
                discountPrice: { $subtract: [ "$price", { $multiply: ["$price", { $divide: ["$discount", 100] }] } ] },
                'category._id': 1,'category.categoryName': 1,'brand._id': 1,'brand.brandName': 1}}

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])

        return {success: true, data: data}
    } catch (error) {
        next(error)
    }
}

const ListByKeywordService = async(req, next) => {
    try {

        // Pagination params
        let pageNo = parseInt(req.params.pageNo) || 1;
        let perPage = parseInt(req.params.perPage) || 10;
        let skip = (pageNo - 1) * perPage;
        let keyword = req.params.Keyword;

        // Regex for case-insensitive search
        let SearchQuery = {};
        if(keyword && keyword !== '0') {
            const SearchRegex = {'$regex': keyword, '$options': 'i'}
            const SearchParams = [{'name': SearchRegex}, {'price': SearchRegex}, {'remark': SearchRegex}]
            SearchQuery = {$or: SearchParams}
        }
        const MatchStage = {$match: SearchQuery}
        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandID',foreignField: '_id',as: 'brand'}}
        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'categoryID',foreignField: '_id',as: 'category'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        const UnwindCategoryStage = {$unwind: '$category'}
        const ProjectionStage = {$project: {_id:1,name: 1, description: 1, price: 1,discount: 1, image:1, remark:1,
                discountPrice: { $subtract: [ "$price", { $multiply: ["$price", { $divide: ["$discount", 100] }] } ] },
                'category._id': 1,'category.categoryName': 1,'brand._id': 1,'brand.brandName': 1}}

       // Pagination using $facet
        const FacetStage = {
        $facet: {
            data: [{ $skip: skip }, { $limit: perPage }],
            totalCount: [{ $count: "count" }],
        },
        };

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage,
            FacetStage
        ])

         // Format response
        const totalCount = data[0].totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalCount / perPage);

        return {success: true, page:pageNo, perPage, totalPages, totalCount, data: data[0].data}

    } catch (error) {
        next(error)
    }
}

// sort by price
const ListByPriceSortService = async (req, next) => {
    try {
        let sortOrder = req.params.sortOrder === 'asc' ? 1 : -1

        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'brandID',foreignField: '_id',as: 'brand'}}
        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'categoryID',foreignField: '_id',as: 'category'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        const UnwindCategoryStage = {$unwind: '$category'}
        const ProjectionStage = {$project: {_id:1,name: 1, description: 1, price: 1,discount: 1, image:1, remark:1,
                discountPrice: { $subtract: [ "$price", { $multiply: ["$price", { $divide: ["$discount", 100] }] } ] },
                'category._id': 1,'category.categoryName': 1,'brand._id': 1,'brand.brandName': 1}}
        const SortStage = { $sort: { price: sortOrder } };

        
        const data = await ProductModel.aggregate([
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage,
            SortStage,
        ]);
        return {success: true, sortBy: 'price', sortOrder: sortOrder === 1 ? 'asc' : 'desc', data}

    } catch (error) {
        next(error)
    }
}



module.exports = {
    ListAllProduct,
    ListByBrandService,
    ListByCategoryService,
    ListByRemarkService,
    ListBySimilarService,
    DetailsService,
    ListByKeywordService,
    ListByPriceSortService
    
}