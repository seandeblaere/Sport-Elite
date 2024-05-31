import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../Middleware/auth/authMiddleware";
import ProductModel from "../Product/Product.model";
import NotFoundError from "../../Middleware/error/NotFoudError";

const login = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;

  res.json({
    token: user.generateToken(),
  });
};

const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;
  res.json(user);
};

const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    user.favorites.push(product.id);
    await user.save();

    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
};

const removeFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { productId } = req.params;

    user.favorites = user.favorites.filter(
      (favProductId) => favProductId.toString() !== productId
    );
    await user.save();

    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
};

export { login, getCurrentUser, addFavorite, removeFavorite };
