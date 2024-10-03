class RockLangInterpreter {
  constructor() {
    this.variables = {}; // For storing riffs (variables)
    this.functions = {}; // For storing solos (functions)
    this.output = ""; // To store output to be displayed
  }

  // Function to run the input code
  run(code) {
    const lines = code.split("\n");
    for (let line of lines) {
      line = line.trim();
      if (line.startsWith("riff ") || line.startsWith("setlist ")) {
        this.handleVariable(line);
      } else if (line.startsWith("solo ")) {
        this.handleFunction(line, lines);
      } else if (line.startsWith("ifYoureFeelingIt")) {
        this.handleIfElse(line, lines);
      } else if (line.startsWith("jam")) {
        this.handleLoop(line, lines);
      } else if (line.startsWith("play ")) {
        this.handleFunctionCall(line);
      }
    }
  }

  // Function to handle riff (variable declaration) and setlist (array declaration)
  handleVariable(line) {
    // Check if it's an array declared with 'setlist' or a normal variable with 'riff'
    const arrayMatch = /(?:riff|setlist) (\w+) = \[(.*)\];/.exec(line);
    if (arrayMatch) {
      const [_, name, values] = arrayMatch;
      // Split the array elements by commas and store it as an array
      this.variables[name] = values
        .split(",")
        .map((v) => v.trim().replace(/['"]+/g, ""));
      console.log(`Array ${name} stored:`, this.variables[name]); // DEBUG LOG
    } else {
      // Handle normal variables (non-array)
      const match = /riff (\w+) = (.*);/.exec(line);
      if (match) {
        const [_, name, value] = match;
        this.variables[name] = value.replace(/['"]+/g, ""); // Store the variable
        console.log(`Variable ${name} stored:`, this.variables[name]); // DEBUG LOG
      }
    }
  }

  // Function to handle if-else
  handleIfElse(line, lines) {
    const match = /ifYoureFeelingIt\((.*)\)/.exec(line);
    if (match) {
      const condition = match[1];
      const conditionResult = this.evaluateCondition(condition);
      const ifBody = [];
      const elseBody = [];
      let insideIf = false;
      let insideElse = false;

      for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
        const nextLine = lines[i].trim();
        if (nextLine.startsWith("}")) {
          if (insideIf) {
            insideIf = false;
          } else if (insideElse) {
            insideElse = false;
          }
        } else if (nextLine.startsWith("whenYoureNot")) {
          insideElse = true;
        } else if (insideIf) {
          ifBody.push(nextLine);
        } else if (insideElse) {
          elseBody.push(nextLine);
        } else {
          insideIf = true;
        }
      }

      if (conditionResult) {
        this.executeBlock(ifBody);
      } else {
        this.executeBlock(elseBody);
      }
    }
  }

  // Function to handle jam (loops)
  handleLoop(line, lines) {
    const match = /jam\((.*) in (.*)\)/.exec(line);
    if (match) {
      const [_, item, setlist] = match;

      // Ensure setlist exists in variables and is an array or string
      if (this.variables[setlist]) {
        let array = this.variables[setlist];

        // Convert the value to an array if it's not already one
        if (typeof array === "string") {
          array = array.split(",").map((s) => s.trim());
        }

        const body = [];
        for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
          const nextLine = lines[i].trim();
          if (nextLine.startsWith("}")) {
            break;
          }
          body.push(nextLine);
        }

        // Loop through each item in the setlist array
        array.forEach((value) => {
          this.variables[item] = value;
          this.executeBlock(body);
        });
      } else {
        console.error(
          `Error: setlist '${setlist}' is undefined or not found in variables.`
        );
      }
    }
  }

  // Function to execute blocks of code
  executeBlock(body) {
    const bodyLines = body.join("\n").split("\n");
    for (let line of bodyLines) {
      line = line.trim();
      if (line.startsWith("play ")) {
        this.handleFunctionCall(line);
      } else if (line.startsWith("scream")) {
        const match = /scream\((.*)\)/.exec(line);
        if (match) {
          this.scream(match[1]);
        }
      } else if (line.startsWith("whisper")) {
        const match = /whisper\((.*)\)/.exec(line);
        if (match) {
          this.whisper(match[1]);
        }
      }
    }
  }

  // Helper to evaluate conditions
  evaluateCondition(condition) {
    const variableNames = Object.keys(this.variables);

    // Replace each variable in the condition string with its value
    for (const varName of variableNames) {
      const value = this.variables[varName];
      const regex = new RegExp(`\\b${varName}\\b`, "g"); // Match whole word variable names
      condition = condition.replace(regex, value);
    }

    condition = condition.replace(/soundsLike/g, "==");

    try {
      return new Function(`return ${condition};`)();
    } catch (error) {
      console.error("Error evaluating condition: ", error);
      return false;
    }
  }

  // Function to handle scream
  scream(message) {
    this.output += message.toUpperCase().replace(/['"]+/g, "") + "\n";
    this.print(); // Display updated output
  }

  // Function to handle whisper
  whisper(message) {
    this.output += message.toLowerCase().replace(/['"]+/g, "") + "\n";
    this.print(); // Display updated output
  }

  // Print output to HTML element
  print() {
    document.getElementById("output").innerText = this.output;
  }

  // Handle function declarations
  handleFunction(line, lines) {
    const match = /solo (\w+)\(\)/.exec(line);
    if (match) {
      const functionName = match[1];
      const body = [];
      for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
        const nextLine = lines[i].trim();
        if (nextLine.startsWith("}")) {
          break;
        }
        body.push(nextLine);
      }
      this.functions[functionName] = body;
    }
  }

  // Handle function calls
  handleFunctionCall(line) {
    const match = /play (\w+)\(\)/.exec(line);
    if (match) {
      const functionName = match[1];
      const functionBody = this.functions[functionName];
      if (functionBody) {
        this.executeBlock(functionBody);
      } else {
        console.error(`Function '${functionName}' is not defined.`);
      }
    }
  }
}

// Run the interpreter
function runRockLang() {
  const code = document.getElementById("code").value;
  const interpreter = new RockLangInterpreter();
  interpreter.run(code);
}
