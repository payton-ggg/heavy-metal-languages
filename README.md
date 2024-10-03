## RockLang Interpreter 🤘🎸

Welcome to the RockLang Interpreter! This project is a simple interpreter for a programming language inspired by rock music slang and themes. It allows users to write and execute code using fun, thematic syntax while introducing fundamental programming concepts. 🎤🎶

### Overview

RockLang combines the vibrant energy of rock music with the structure of programming languages. Users can express their creativity through code while learning programming fundamentals in a playful way. This interpreter is designed to be user-friendly and engaging, making it perfect for both beginners and seasoned programmers looking for a fun coding experience. 

### Features 🚀

#### Variable Declaration 📦
- Declare variables easily using the `riff` keyword.
- Example:
  ```rocklang
  riff playerName = "Alice";
  ```

#### Array Declaration 📚
- Create and manage collections of items with the `setlist` keyword.
- Example:
  ```rocklang
  setlist songs = ["Rock You Like a Hurricane", "Sweet Child o' Mine", "Livin' on a Prayer"];
  ```

#### Functions 🎸
- Define reusable blocks of code with the `solo` keyword and call them using `play`.
- Example:
  ```rocklang
  solo playGuitar() {
      scream("Shredding the guitar solo!");
  }
  play playGuitar();
  ```

#### Conditional Statements 🔄
- Implement if-else logic using the `ifYoureFeelingIt` keyword.
- Example:
  ```rocklang
  ifYoureFeelingIt(mood soundsLike "happy") {
      scream("Let's rock!");
  } whenYoureNot {
      whisper("Keep it cool...");
  }
  ```

#### Loops 🔁
- Iterate through arrays with the `jam` keyword for easy looping.
- Example:
  ```rocklang
  jam(song in songs) {
      scream("Now playing: " amplify song);
  }
  ```

#### String Manipulation ✨
- Output strings using `scream` for uppercase and `whisper` for lowercase text.
- Example:
  ```rocklang
  scream("LOUD AND PROUD!");
  whisper("softly spoken");
  ```

### Getting Started 🛠️

#### Prerequisites
To run this project, ensure you have:
- A modern web browser for testing the interpreter. 🌐
- Basic understanding of HTML and JavaScript. 💻

#### Installation Steps
1. **Clone the Repository:**
   Open your terminal and run:
   ```bash
   git clone https://github.com/yourusername/rocklang-interpreter.git
   cd rocklang-interpreter
   ```

2. **Open the Project:**
   Locate the `index.html` file in the project directory and open it in your favorite web browser. 🖥️

### Usage 🎉

1. **Write Your Code:**
   Enter your RockLang code in the provided textarea. ✍️
   
2. **Run Your Code:**
   Click the "Run" button to execute the code. ▶️

3. **View the Output:**
   The output will be displayed in the designated output area below the textarea. 📜

### Example Code 💡

Here are a few engaging examples to inspire your RockLang coding journey:

**Example 1: Greeting a Player**
```rocklang
riff playerName = "Bob";

solo greetPlayer() {
    scream("Welcome, " amplify playerName);
}

play greetPlayer();
```

**Expected Output:**
```
WELCOME, BOB
```

**Example 2: Conditional Logic Based on Mood**
```rocklang
riff mood = "happy";

ifYoureFeelingIt(mood soundsLike "happy") {
    scream("Let's rock!");
} whenYoureNot {
    whisper("Keep it cool...");
}
```

**Expected Output:**
```
LET'S ROCK!
```

**Example 3: Looping through an Array of Songs**
```rocklang
setlist songs = ["Stairway to Heaven", "Bohemian Rhapsody", "Hotel California"];

jam(song in songs) {
    scream("Now playing: " amplify song);
}
```

**Expected Output:**
```
NOW PLAYING: STAIRWAY TO HEAVEN
NOW PLAYING: BOHEMIAN RHAPSODY
NOW PLAYING: HOTEL CALIFORNIA
```

### Contributing 🤝

Contributions to RockLang are always welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to open an issue or submit a pull request. 💬 Your input helps make the project better for everyone!

### License 📜

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file in the project repository.

### Acknowledgments 🙌

- RockLang was inspired by the energetic world of rock music and programming languages. 🎶
- Special thanks to the open-source community for the tools and libraries that made this project possible. 🌍 Your contributions and innovations inspire developers everywhere!

---

Enjoy rocking out with RockLang! 🤘 If you have any questions, feel free to reach out. Happy coding! 🎉
