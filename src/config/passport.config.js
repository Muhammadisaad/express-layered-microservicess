import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import User from "../models/register.model.js";





//serialize and deserializeUser which come from github
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async(id,done)=>{
    try {
        const user = await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error,null);
        
    }


 });
 
 passport.use(
     new GithubStrategy(
         {
             clientID: process.env.GITHUB_CLIENT_ID,
             clientSecret: process.env.GITHUB_CLIENT_SECRET,
             callbackURL: "http://localhost:8000/api/v1/auth/github/callback",
             scope: ["user:email"],
         },
         (accessToken, refreshToken, profile, done) => {
             // Using Promise.resolve to handle async logic without try/catch
             // This is the asyncHandler equivalent for Passport.
             Promise.resolve()
                 .then(
                     async () => {
                     // Step A: Check if user exists by GitHub ID
                     let user = await User.findOne({ githubId: profile.id });
                     if (user) {
                         return done(null, user);
                     }
 
                     // Step B: Check if user exists by Email (to link accounts)
                     const email = profile.emails?.[0]?.value;
 
                     if (email) {
                         user = await User.findOne({ email });
                         if (user) {
                             // Link GitHub ID to existing email/password account
                             user.githubId = profile.id;
                             user.avatar = profile.photos?.[0]?.value || user.avatar;
                             await user.save();
                             return done(null, user);
                         }
                     }
 
                     // Step C: Create a brand new user
                     const username = profile.username || profile.displayName;
                     let finalUsername = username;
                     let usernameExists = await User.findOne({ username: finalUsername });
                     if (usernameExists) {
                         finalUsername = `${username}_${profile.id.slice(0, 4)}`;
                     }
 
                     const finalEmail = email || `${profile.id}@github.oauth`;
 
                     user = await User.create({
                         githubId: profile.id,
                         username: finalUsername,
                         name: profile.displayName || profile.username || "GitHub User",
                         email: finalEmail,
                         avatar: profile.photos?.[0]?.value || null,
                         password: null,
                         role: "user"
                     });
 
                     return done(null, user);

                 })
                 .catch((error) => {
                     console.error("GitHub OAuth Error:", error);
                     return done(error, null);
                 });
         }
     )
 );
 
        export default passport;