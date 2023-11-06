const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favourite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update whet call store", async () => {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add person with favorite number", async () => {
        const expectedValue = "11"
        const expectedName = "Julia"
        const transactionResponse = await simpleStorage.addPerson(
            expectedName,
            expectedValue,
        )
        await transactionResponse.wait(1)
        const people = await simpleStorage.people(0)
        const currentName = people[1]
        const currentValue = people[0]
        const currentMapValue =
            await simpleStorage.nameToFavoriteNumber(currentName)
        assert.equal(currentValue.toString(), expectedValue)
        assert.equal(currentName.toString(), expectedName)
        assert.equal(currentMapValue.toString(), expectedValue)
    })
})
