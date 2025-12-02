
const ProductModel = require("../models/ProductModel")
const { ListAllProduct, DetailsService, ListByPriceSortService } = require("../services/ProductServices")
const cloudinary = require('cloudinary').v2
const { ListByBrandService, ListByCategoryService, ListByRemarkService, ListBySimilarService, ListByKeywordService } = require("../services/ProductServices")



// Create Product
exports.CreateProduct = async (req, res, next) => {
    try {
        const {name, description, price, discount, remark, categoryID, brandID} = req.body

        // Extract uploaded files
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(Boolean)

        if(images.length === 0) {
            const err = new Error('At least one product image is required.')
            err.status = 400
            return next(err)
        }

        // Upload images to Cloudinary
        const imageUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    folder: 'products',
                    resource_type: 'image'
                })
                // Use optimized, high-res version
                return result.secure_url.replace('/upload/', '/upload/q_auto,f_auto/')
            })
        )

        // Create product

        const productData = await ProductModel.create({ name, description, price, discount, remark, categoryID, brandID, image: imageUrl })

        return res.status(201).json({success: true, message: 'Product added successfully.', data: productData})
    } catch (error) {
        next(error)
    }

}

// AllProductList
exports.ProductList = async (req, res, next) => {
    const result = await ListAllProduct(next)
    return res.status(200).json(result)
}

// Brand wise product list
exports.ProductListByBrand = async (req, res, next) => {
    const result = await ListByBrandService(req, next)
    return res.status(200).json(result)
}

// Category wise product list
exports.ProductListByCategory = async (req, res, next) => {
    const result = await ListByCategoryService(req, next)
    return res.status(200).json(result)
}

// Product list by remark
exports.ProductListByRemark = async (req, res, next) => {
    const result = await ListByRemarkService(req, next)
    return res.status(200).json(result)
}

// similier product
exports.ProductListBySimilar = async (req, res, next) => {
    const result = await ListBySimilarService(req, next)
    return res.status(200).json(result)
}

// A product details
exports.ProductDetails = async (req, res, next) => {
    const result = await DetailsService(req, next)
    return res.status(200).json(result)
}

// Product Search
exports.ProductListByKeyword = async (req, res, next) => {
    const result = await ListByKeywordService(req, next)
    return res.status(200).json(result)
}

// Product filter by price
exports.ProductSortByPrice = async (req, res, next) => {
    const result = await ListByPriceSortService(req, next)
    return res.status(200).json(result)
}


// update product

exports.UpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params; // product id
    const { name, description, price, discount, discountPrice, remark, categoryID, brandID } = req.body;

    // Handle uploaded images (if any)
    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    // Build update object
    const updateFields = {
      name,
      description,
      price,
      discount,
      discountPrice,
      remark,
      categoryID,
      brandID,
    };

    if (imagesUrl.length > 0) {
      updateFields.image = imagesUrl; // replace old images with new ones
    }

    // Update in DB
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateFields, {
      new: true, // return updated doc
      runValidators: true, // validate schema
    });

    if (!updatedProduct) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};


// remove product
exports.RemoveProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const Query = {_id: id}

        await ProductModel.deleteOne(Query)

        return res.status(200).json({success: true, message: 'Product delete successfull.'})
    } catch (error) {
        next(error)
    }
}