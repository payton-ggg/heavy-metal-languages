// RockLang Interpreter

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
      if (line.startsWith("riff ")) {
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

  // Function to handle riff (variable declaration)
  // Function to handle riff (variable declaration)
  handleVariable(line) {
    // Check if it's an array
    const arrayMatch = /riff (\w+) = \[(.*)\];/.exec(line);
    if (arrayMatch) {
      const [_, name, values] = arrayMatch;
      // Split the array elements by comma and store it as an array
      this.variables[name] = values
        .split(",")
        .map((v) => v.trim().replace(/['"]+/g, ""));
    } else {
      // Handle normal variables (non-array)
      const match = /riff (\w+) = (.*);/.exec(line);
      if (match) {
        const [_, name, value] = match;
        this.variables[name] = value.replace(/['"]+/g, ""); // Store the variable
      }
    }
  }

  // Function to handle solo (function declaration)
  handleFunction(line, lines) {
    const match = /solo (\w+)\((.*)\)/.exec(line);
    if (match) {
      const [_, name, params] = match;
      const body = [];
      let insideFunction = false;

      for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
        const nextLine = lines[i].trim();
        if (nextLine.startsWith("}")) {
          break;
        }
        body.push(nextLine);
        insideFunction = true;
      }

      this.functions[name] = {
        params: params.split(",").map((p) => p.trim()),
        body: body.join("\n"),
      };
    }
  }

  // Function to handle solo (function call)
  handleFunctionCall(line) {
    const match = /play (\w+)\((.*)\)/.exec(line);
    if (match) {
      const [_, name, args] = match;
      const func = this.functions[name];
      if (func) {
        const argValues = args.split(",").map((a) => a.trim());
        const paramMap = {};
        func.params.forEach((param, i) => {
          paramMap[param] = argValues[i];
        });
        this.executeFunctionBody(func.body, paramMap);
      }
    }
  }

  // Execute function body
  executeFunctionBody(body, paramMap) {
    const bodyLines = body.split("\n");
    for (let line of bodyLines) {
      line = line.trim();
      if (line.startsWith("scream")) {
        const match = /scream\((.*)\)/.exec(line);
        if (match) {
          this.output += match[1].toUpperCase().replace(/['"]+/g, "") + "\n";
        }
      } else if (line.startsWith("whisper")) {
        const match = /whisper\((.*)\)/.exec(line);
        if (match) {
          this.output += match[1].toLowerCase().replace(/['"]+/g, "") + "\n";
        }
      } else if (line.startsWith("play ")) {
        this.handleFunctionCall(line);
      } else if (line.includes("amplify")) {
        const parts = line.split(" amplify ");
        const result = parts
          .map((p) => p.trim().replace(/['"]+/g, ""))
          .join("");
        this.output += result + "\n";
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

  // Execute a block of code
  executeBlock(body) {
    const bodyLines = body.join("\n").split("\n");
    for (let line of bodyLines) {
      line = line.trim();
      if (line.startsWith("play ")) {
        this.handleFunctionCall(line);
      } else if (line.startsWith("scream")) {
        const match = /scream\((.*)\)/.exec(line);
        if (match) {
          this.output += match[1].toUpperCase().replace(/['"]+/g, "") + "\n";
        }
      } else if (line.startsWith("whisper")) {
        const match = /whisper\((.*)\)/.exec(line);
        if (match) {
          this.output += match[1].toLowerCase().replace(/['"]+/g, "") + "\n";
        }
      }
    }
  }

  // Helper to evaluate conditions
  evaluateCondition(condition) {
    // Replace variable names with their values from the interpreter's variables
    const variableNames = Object.keys(this.variables);

    // Replace each variable in the condition string with its value
    for (const varName of variableNames) {
      const value = this.variables[varName];
      const regex = new RegExp(`\\b${varName}\\b`, "g"); // Match whole word variable names
      condition = condition.replace(regex, value);
    }

    // Replace RockLang 'soundsLike' with '=='
    condition = condition.replace(/soundsLike/g, "==");

    // Now safely evaluate the condition without using eval
    try {
      return new Function(`return ${condition};`)();
    } catch (error) {
      console.error("Error evaluating condition: ", error);
      return false;
    }
  }

  // Print output to console
  print() {
    document.getElementById("output").innerText = this.output;
  }
}

// Run the interpreter
function runRockLang() {
  const code = document.getElementById("code").value;
  const interpreter = new RockLangInterpreter();
  interpreter.run(code);
  interpreter.print();
}
