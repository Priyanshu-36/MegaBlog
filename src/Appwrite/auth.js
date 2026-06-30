import conf from "../conf/conf.js";
import { Client, ID, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return await this.login({ email, password });
        //call another method
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: Signup :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: Login :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      return this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
  }
  async logout() {
    try {
      await this.account.deleteSession();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authservice = new AuthService();
export default authservice;
