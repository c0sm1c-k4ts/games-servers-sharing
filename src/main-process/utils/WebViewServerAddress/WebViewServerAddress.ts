import { AddressInfo } from "node:net";

export class WebViewServerAddress {
  private localHostString = "localhost";

  constructor(private addressInfo: string | AddressInfo) {}

  getServerAddress = (): string => {
    this.checkAddressInfoExistance();
    const address =
      typeof this.addressInfo === "string"
        ? this.processStringAddressInfo()
        : this.processAddressInfoStructure();

    return "http://" + address;
  };

  private checkAddressInfoExistance = () => {
    if (!this.addressInfo) {
      throw new Error("Web view server wasn't initialized yet.");
    }
  };

  private processAddressInfoStructure = () => {
    const structureAddressInfo = this.addressInfo as AddressInfo;
    const isAddressLineOfNormalType =
      !structureAddressInfo.address.includes(":");
    const addressLine = isAddressLineOfNormalType
      ? structureAddressInfo.address
      : this.localHostString;

    return `${addressLine}:${structureAddressInfo.port}`;
  };

  private processStringAddressInfo = () => {
    const stringAddressInfo = this.addressInfo as string;
    const portPartOnly = stringAddressInfo.match(/\d+/g).join("");

    return `${this.localHostString}:${portPartOnly}`;
  };
}
