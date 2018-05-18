import * as chai from "chai";
import * as chaiAsPromise from "chai-as-promised";
import * as cinonChai from "sinon-chai";
import * as superTest from "supertest";
import { App } from "./app";

const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiAsPromise);

const HOST = "http://localhost:8087";

const request = superTest(HOST);

const fomartResponse = res => {
  return JSON.parse(res)["data"];
};

describe("restful api", () => {
  before(() => new App().start().then());
  describe("GET /apis/user/list", () => {
    it("should return userlist", done => {
      request
        .get("/apis/user/list")
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.be.an("string");
          expect(fomartResponse(res.text)).to.be.an("array");
          expect(fomartResponse(res.text).length).to.equal(2);
          expect(fomartResponse(res.text)[0]["name"]).to.equal("zhangsan");
          done();
        });
    });
  });

  describe("GET /apis/user/detail/:id", () => {
    it("should return name zhangsan", done => {
      request
        .get("/apis/user/detail/A111")
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.text).to.be.an("string");
          expect(fomartResponse(res.text)).to.be.an("object");
          expect(fomartResponse(res.text)["name"]).to.equal("zhangsan");
          done();
        });
    });
  });
});
