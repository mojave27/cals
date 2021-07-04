export const Style = {
  base: [
    "color: #fff",
    "background-color: #444",
    "padding: 2px 4px",
    "border-radius: 2px"
  ],
  warning: [
    "color: #eee",
    "background-color: red"
  ],
  success: [
    "background-color: green"
  ]
}

class StyledLogger {
	constructor(type) {
		this.type = type;
	}

	getType() {
		return this.type;
	}

	static createLogger(type) {
		let loggerType = type === "browser" ? "browser" : "terminal";
		return new StyledLogger(loggerType);
	}

  static log = (text, extra = []) => {
    let style = Style.base.join(';') + ';';
    style += extra.join(';'); // Add any additional styles
    console.log(`%c${text}`, style);
  }
}

export default StyledLogger