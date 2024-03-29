const Category = require('../models/category');
const response = require('../helpers/response');

class CategoriesController {
    static async getCategories(req, res) {
        try {
            const categoryList = await Category.find();

            if (!categoryList) {
                res.status(500).send(response('Category not found', {}, false));
            }

            res.status(200).send(
                response('Fetched categories successfully', categoryList)
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getCategoryById(req, res) {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return res
                    .status(500)
                    .send(
                        response(
                            'Category with the given ID was not found',
                            {},
                            false
                        )
                    );
            }

            res.status(200).send(
                response('Fetched category successfully', category)
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    static async createCategory(req, res) {
        try {
            let category = new Category({
                name: req.body.name,
                icon: req.body.icon,
            });
            category = await category.save();

            if (!category)
                return res
                    .status(404)
                    .send(
                        response('The category can not be created', {}, false)
                    );

            res.send(response('Category created successfully', category));
        } catch (error) {
            console.log(error.message);
        }
    }

    static async updateCategoryById(req, res) {
        try {
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name,
                    icon: req.body.icon,
                },
                { new: true }
            );

            if (!category)
                return res
                    .status(404)
                    .send(
                        response('The category can not be updated', {}, false)
                    );

            res.send(response('Category was successfully updated', category));
        } catch (error) {
            console.log(error.message);
        }
    }

    static deleteCategoryById(req, res) {
        Category.findByIdAndDelete(req.params.id)
            .then((category) => {
                if (category) {
                    return res
                        .status(200)
                        .send(
                            response(
                                'The category was successfully deleted',
                                {}
                            )
                        );
                } else {
                    return res
                        .status(404)
                        .send(response('Category not found', {}, false));
                }
            })
            .catch((error) => {
                return res.status(400).send(response(error.message, {}, false));
            });
    }
}

module.exports = CategoriesController;
