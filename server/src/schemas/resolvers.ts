import User from "../models/User.js";
import { signToken } from "../services/auth.js";
//import { AuthenticationError } from "@apollo/server";

const resolvers = {
    Query: {
        getMe: async (_parent: any, _args: any, context: any) => {
            console.log("getMe context", context);
            if (context.user) {
                let user;
                try {
                    user = await User.findById(context.user._id).select("-__v -password").populate("savedBooks");
                } catch (error) {
                    console.log("Err: ", error);
                    throw new Error("You need to be logged in!");
                }
                return user;
            }
            return null;
        }
    },

    // Todo: implement 'addUser' resolver to log 'args', destructure 'username', 'email', 'password', create User, generate JWT via 'signToken', and return { token, user }
    // Note logs incoming 'args', validates input by extracting 'username', 'email', 'password' from args, calls User.create({ username, email, password }), uses signToken(user.username, user.email, user._id), and returns the new 'token' and 'user'


    Mutation: {
        addUser: async (_parent: any, args: any, _context: any) => {
            console.log("addUser args", args);
            // validate the input data
            const { username, email, password } = args;
            // Create a new User instance
            const user = await User.create({ username, email, password });
            // create a new token for the user
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        // Todo: implement login resolver to find user by email, verify password, generate JWT, and return token & user
        // Note uses User.findOne({ email: args.email }) and throws if no user, calls user.isCorrectPassword(args.password) and throws on bad credentials, then uses signToken(user.username, user.password, user._id) to create the token

        login: async (_parent: any, args: any, _context: any) => {
            const user = await User.findOne({ email: args.email });
            if (!user) {
                throw new Error("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(args.password);

            if (!correctPw) {
                throw new Error("Bad Authentication credentials");

            }
            const token = signToken(user.username, user.password, user._id);
            return { token, user };
        },

        // Todo: implement 'saveBook' resolver to use '$addToSet' to add bookData to 'savedBooks' and return updated user
        // Note checks for context.user, calls User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: args.bookData } }, { new: true, runValidators: true }), and throws error if not authenticated


        saveBook: async (_parent: any, args: any, context: any) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.bookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new Error("You need to be logged in!");
        },

        // Todo: implement deleteBook resolver to remove book from savedBooks by bookId using $pull
        // Note checks for context.user, uses User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true }), returns updated user, and throws if not authenticated


        deleteBook: async (_parent: any, { bookId }: any, context: any) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new Error("You need to be logged in!");
        }
    }
};

export default resolvers;