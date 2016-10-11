import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import mochaAsPromised from "mocha-as-promised";
import sinonAsPromised from "sinon-as-promised";
import dotenv from 'dotenv';

dotenv.config()
mochaAsPromised()
chai.use(chaiAsPromised);

global.expect = chai.expect;
