const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EIPTEST", (m) => {

  const EIPTEST = m.contract("EIPTEST");

  return { EIPTEST };
});
