/* ==========================================================================
   MOCK DATA & LOCALSTORAGE REAL-TIME SYNC ENGINE
   ========================================================================== */

const INITIAL_SUBMISSIONS = [];

const INITIAL_STUDENTS = [
  { id: 3, fullName: 'Alex Johnson (Student & Parent Common Access)', email: 'student3@school.com', gradeNumber: 3, currentClassNumber: 1, parentName: 'Alex Parent', progressPercentage: 100, lastActive: 'Active Today', submissionsCount: 1 },
  { id: 4, fullName: 'Sam Smith', email: 'newstudent@school.com', gradeNumber: 3, currentClassNumber: 1, parentName: 'Sam Parent', progressPercentage: 25, lastActive: 'Active Today', submissionsCount: 1 },
  { id: 5, fullName: 'Smith Sam', email: 'newstudent5@school.com', gradeNumber: 5, currentClassNumber: 1, parentName: 'Smith Parent', progressPercentage: 25, lastActive: 'Active Today', submissionsCount: 1 },
  { id: 6, fullName: 'Emma Watson (Class 5 Student & Parent)', email: 'student5@school.com', gradeNumber: 5, currentClassNumber: 1, parentName: 'Emma Parent', progressPercentage: 100, lastActive: 'Active Today', submissionsCount: 1 }
];

const INITIAL_ADMINS = [
  { id: 1, fullName: 'Super Admin', email: 'superadmin@school.com', role: 'super_admin', status: 'ACTIVE', lastLogin: 'Active Today' },
  { id: 2, fullName: 'System Administrator', email: 'admin@school.com', role: 'admin', status: 'ACTIVE', lastLogin: 'Active Today' },
  { id: 3, fullName: 'Class 5 Teacher', email: 'teacher@school.com', role: 'admin', status: 'ACTIVE', lastLogin: 'Active Today' }
];

const INITIAL_COURSES = [
  {
    "gradeNumber": 3,
    "name": "Class 3 Curriculum",
    "chapters": [
      {
        "id": 301,
        "chapterNumber": 1,
        "title": "Chapter 1: Computer Fundamentals & Hardware",
        "description": "Introduction to computer parts, input/output devices, mouse, and keyboard skills.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 3011,
            "dayNumber": 1,
            "topicTitle": "Class 1: Introduction to Computer & Parts"
          },
          {
            "id": 3012,
            "dayNumber": 2,
            "topicTitle": "Class 2: Input & Output Devices"
          },
          {
            "id": 3013,
            "dayNumber": 3,
            "topicTitle": "Class 3: Using Mouse & Keyboard Navigation"
          },
          {
            "id": 3014,
            "dayNumber": 4,
            "topicTitle": "Class 4: Basic Computer Handling & Safety"
          }
        ]
      },
      {
        "id": 302,
        "chapterNumber": 2,
        "title": "Chapter 2: Operating System & File Management",
        "description": "Understanding desktop, files, folders, and operating system basics.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 3021,
            "dayNumber": 5,
            "topicTitle": "Class 5: Desktop Screen & Taskbar Basics"
          },
          {
            "id": 3022,
            "dayNumber": 6,
            "topicTitle": "Class 6: Creating Files & Folders"
          },
          {
            "id": 3023,
            "dayNumber": 7,
            "topicTitle": "Class 7: File Saving & Opening Documents"
          },
          {
            "id": 3024,
            "dayNumber": 8,
            "topicTitle": "Class 8: File Management Practices"
          }
        ]
      },
      {
        "id": 303,
        "chapterNumber": 3,
        "title": "Chapter 3: Paint & Graphic Editing Skills",
        "description": "Drawing shapes, coloring, editing digital art, and creative painting tools.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 3031,
            "dayNumber": 9,
            "topicTitle": "Class 9: Introduction to Paint Interface & Tools"
          },
          {
            "id": 3032,
            "dayNumber": 10,
            "topicTitle": "Class 10: Drawing Shapes & Line Art"
          },
          {
            "id": 3033,
            "dayNumber": 11,
            "topicTitle": "Class 11: Color Palette & Bucket Fill Tool"
          },
          {
            "id": 3034,
            "dayNumber": 12,
            "topicTitle": "Class 12: Brush Types & Freehand Sketching"
          },
          {
            "id": 3035,
            "dayNumber": 13,
            "topicTitle": "Class 13: Text Tool & Labeling Drawings"
          },
          {
            "id": 3036,
            "dayNumber": 14,
            "topicTitle": "Class 14: Poster Creation Project"
          }
        ]
      },
      {
        "id": 304,
        "chapterNumber": 4,
        "title": "Chapter 4: Typing Practice & Speed Mastery",
        "description": "Home row finger positioning, typing speed drills, and keyboard accuracy.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 3041,
            "dayNumber": 15,
            "topicTitle": "Class 15: Home Row Finger Placement"
          },
          {
            "id": 3042,
            "dayNumber": 16,
            "topicTitle": "Class 16: Top Row Keys Practice"
          },
          {
            "id": 3043,
            "dayNumber": 17,
            "topicTitle": "Class 17: Bottom Row Keys Practice"
          },
          {
            "id": 3044,
            "dayNumber": 18,
            "topicTitle": "Class 18: Word Typing & Accuracy Test"
          }
        ]
      },
      {
        "id": 305,
        "chapterNumber": 5,
        "title": "Chapter 5: Handwriting & Letter Skills",
        "description": "Digital handwriting practice, letter formation, and neat sentence writing.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 3051,
            "dayNumber": 19,
            "topicTitle": "Class 19: Uppercase Letter Formation A-Z"
          },
          {
            "id": 3052,
            "dayNumber": 20,
            "topicTitle": "Class 20: Lowercase Letter Formation a-z"
          },
          {
            "id": 3053,
            "dayNumber": 21,
            "topicTitle": "Class 21: Sentence Handwriting & Spacing"
          }
        ]
      },
      {
        "id": 306,
        "chapterNumber": 6,
        "title": "Chapter 6: Basic Mathematics & Logic Activities",
        "description": "Counting puzzles, ascending/descending order, shape logic, and math games.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 3061,
            "dayNumber": 22,
            "topicTitle": "Class 22: Number Sequences & Patterns"
          },
          {
            "id": 3062,
            "dayNumber": 23,
            "topicTitle": "Class 23: Ascending & Descending Order Games"
          },
          {
            "id": 3063,
            "dayNumber": 24,
            "topicTitle": "Class 24: Addition & Subtraction Visual Puzzles"
          },
          {
            "id": 3064,
            "dayNumber": 25,
            "topicTitle": "Class 25: Interactive Math Logic Project"
          }
        ]
      }
    ]
  },
  {
    "gradeNumber": 4,
    "name": "Class 4 Curriculum",
    "chapters": [
      {
        "id": 401,
        "chapterNumber": 1,
        "title": "Chapter 1: Computer Fundamentals & Storage",
        "description": "Primary memory, secondary storage, RAM, ROM, and system architecture.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 4011,
            "dayNumber": 1,
            "topicTitle": "Class 1: Evolution of Computers & Types"
          },
          {
            "id": 4012,
            "dayNumber": 2,
            "topicTitle": "Class 2: Memory & Storage Devices (RAM vs ROM)"
          },
          {
            "id": 4013,
            "dayNumber": 3,
            "topicTitle": "Class 3: Hard Drives, Flash Drives & Cloud Storage"
          },
          {
            "id": 4014,
            "dayNumber": 4,
            "topicTitle": "Class 4: Computer Safety & Maintenance Tips"
          },
          {
            "id": 4015,
            "dayNumber": 5,
            "topicTitle": "Class 5: Practical Storage Management Activity"
          }
        ]
      },
      {
        "id": 402,
        "chapterNumber": 2,
        "title": "Chapter 2: Word Processing & Document Formatting",
        "description": "Font formatting, paragraph alignment, lists, tables, and document layout.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 4021,
            "dayNumber": 6,
            "topicTitle": "Class 6: Introduction to Word Processor Interface"
          },
          {
            "id": 4022,
            "dayNumber": 7,
            "topicTitle": "Class 7: Text Formatting: Bold, Italic, Color & Size"
          },
          {
            "id": 4023,
            "dayNumber": 8,
            "topicTitle": "Class 8: Paragraph Alignment & Line Spacing"
          },
          {
            "id": 4024,
            "dayNumber": 9,
            "topicTitle": "Class 9: Bullets, Numbered Lists & Headings"
          },
          {
            "id": 4025,
            "dayNumber": 10,
            "topicTitle": "Class 10: Inserting Images & Shapes into Documents"
          },
          {
            "id": 4026,
            "dayNumber": 11,
            "topicTitle": "Class 11: Formatting Complete Article Project"
          }
        ]
      },
      {
        "id": 403,
        "chapterNumber": 3,
        "title": "Chapter 3: Scratch Programming Basics",
        "description": "Block programming, sprites, backdrops, motion blocks, and animation loops.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 4031,
            "dayNumber": 12,
            "topicTitle": "Class 12: Introduction to Scratch Environment"
          },
          {
            "id": 4032,
            "dayNumber": 13,
            "topicTitle": "Class 13: Sprites, Costumes & Backdrops"
          },
          {
            "id": 4033,
            "dayNumber": 14,
            "topicTitle": "Class 14: Motion & Event Blocks (Make Sprite Walk)"
          },
          {
            "id": 4034,
            "dayNumber": 15,
            "topicTitle": "Class 15: Sound & Speech Bubble Blocks"
          },
          {
            "id": 4035,
            "dayNumber": 16,
            "topicTitle": "Class 16: Repeat Loops & Sequence Logic"
          },
          {
            "id": 4036,
            "dayNumber": 17,
            "topicTitle": "Class 17: Animated Storytelling Project"
          }
        ]
      },
      {
        "id": 404,
        "chapterNumber": 4,
        "title": "Chapter 4: Internet & Web Browsing Safety",
        "description": "Web browsers, search engines, URLs, digital safety, and netiquette.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 4041,
            "dayNumber": 18,
            "topicTitle": "Class 18: What is Internet & World Wide Web?"
          },
          {
            "id": 4042,
            "dayNumber": 19,
            "topicTitle": "Class 19: Web Browsers & URL Navigation"
          },
          {
            "id": 4043,
            "dayNumber": 20,
            "topicTitle": "Class 20: Effective Search Engine Queries"
          },
          {
            "id": 4044,
            "dayNumber": 21,
            "topicTitle": "Class 21: Safe Browsing & Protecting Personal Info"
          },
          {
            "id": 4045,
            "dayNumber": 22,
            "topicTitle": "Class 22: Identifying Safe vs Unsafe Links"
          },
          {
            "id": 4046,
            "dayNumber": 23,
            "topicTitle": "Class 23: Digital Safety Certificate Quiz"
          }
        ]
      }
    ]
  },
  {
    "gradeNumber": 5,
    "name": "Class 5 Curriculum",
    "chapters": [
      {
        "id": 501,
        "chapterNumber": 1,
        "title": "Chapter 1: Advanced Computer Operations & Hardware",
        "description": "CPU architecture, motherboard components, software categories, and utility tools.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 5011,
            "dayNumber": 1,
            "topicTitle": "Class 1: Inside the Computer: CPU & Ports"
          },
          {
            "id": 5012,
            "dayNumber": 2,
            "topicTitle": "Class 2: System Software vs Application Software"
          },
          {
            "id": 5013,
            "dayNumber": 3,
            "topicTitle": "Class 3: Utility Programs: Antivirus & Disk Cleanup"
          },
          {
            "id": 5014,
            "dayNumber": 4,
            "topicTitle": "Class 4: Operating System Customization Settings"
          },
          {
            "id": 5015,
            "dayNumber": 5,
            "topicTitle": "Class 5: Computer Architecture Practical Activity"
          }
        ]
      },
      {
        "id": 502,
        "chapterNumber": 2,
        "title": "Chapter 2: Presentation & Slide Design Mastery",
        "description": "Creating slide decks, animations, transitions, designs, and multimedia presentations.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 5021,
            "dayNumber": 6,
            "topicTitle": "Class 6: Presentation Software Basics & Slide Layouts"
          },
          {
            "id": 5022,
            "dayNumber": 7,
            "topicTitle": "Class 7: Adding Text, Themes & Background Designs"
          },
          {
            "id": 5023,
            "dayNumber": 8,
            "topicTitle": "Class 8: Inserting Images, Audio & Video Clips"
          },
          {
            "id": 5024,
            "dayNumber": 9,
            "topicTitle": "Class 9: Applying Slide Transitions & Object Animations"
          },
          {
            "id": 5025,
            "dayNumber": 10,
            "topicTitle": "Class 10: Slide Show Controls & Presenter View"
          },
          {
            "id": 5026,
            "dayNumber": 11,
            "topicTitle": "Class 11: Interactive Presentation Project"
          }
        ]
      },
      {
        "id": 503,
        "chapterNumber": 3,
        "title": "Chapter 3: Block-Based Game Development",
        "description": "Variables, conditionals, sensing blocks, score systems, and game creation.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 5031,
            "dayNumber": 12,
            "topicTitle": "Class 12: Sensing Blocks & User Interactions"
          },
          {
            "id": 5032,
            "dayNumber": 13,
            "topicTitle": "Class 13: If-Then Conditional Logic in Scratch"
          },
          {
            "id": 5033,
            "dayNumber": 14,
            "topicTitle": "Class 14: Creating Score Variables & Timer"
          },
          {
            "id": 5034,
            "dayNumber": 15,
            "topicTitle": "Class 15: Sprite Collision Detection & Bounce Logic"
          },
          {
            "id": 5035,
            "dayNumber": 16,
            "topicTitle": "Class 16: Designing Game Levels & Obstacles"
          },
          {
            "id": 5036,
            "dayNumber": 17,
            "topicTitle": "Class 17: Complete Arcade Game Project"
          }
        ]
      },
      {
        "id": 504,
        "chapterNumber": 4,
        "title": "Chapter 4: Cyber Safety & Digital Citizenship",
        "description": "Strong passwords, cyberbullying awareness, copyright, and online ethics.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 5041,
            "dayNumber": 18,
            "topicTitle": "Class 18: Digital Footprint & Online Identity"
          },
          {
            "id": 5042,
            "dayNumber": 19,
            "topicTitle": "Class 19: Creating & Managing Strong Passwords"
          },
          {
            "id": 5043,
            "dayNumber": 20,
            "topicTitle": "Class 20: Phishing Emails & Online Scam Defense"
          },
          {
            "id": 5044,
            "dayNumber": 21,
            "topicTitle": "Class 21: Respectful Digital Communication & Ethics"
          },
          {
            "id": 5045,
            "dayNumber": 22,
            "topicTitle": "Class 22: Copyright, Fair Use & Citation Basics"
          },
          {
            "id": 5046,
            "dayNumber": 23,
            "topicTitle": "Class 23: Digital Citizen Badge & Capstone Quiz"
          }
        ]
      }
    ]
  },
  {
    "gradeNumber": 6,
    "name": "Class 6 Curriculum",
    "chapters": [
      {
        "id": 601,
        "chapterNumber": 1,
        "title": "Chapter 1: Computer Fundamentals & OS Deep Dive",
        "description": "Binary data representations, 32-bit vs 64-bit systems, and OS file systems.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 6011,
            "dayNumber": 1,
            "topicTitle": "Class 1: Binary System: Bits & Bytes Basics"
          },
          {
            "id": 6012,
            "dayNumber": 2,
            "topicTitle": "Class 2: Computer Generations & Microprocessors"
          },
          {
            "id": 6013,
            "dayNumber": 3,
            "topicTitle": "Class 3: Windows vs Linux vs Mac File Systems"
          },
          {
            "id": 6014,
            "dayNumber": 4,
            "topicTitle": "Class 4: System Control Panel & Device Manager"
          },
          {
            "id": 6015,
            "dayNumber": 5,
            "topicTitle": "Class 5: Troubleshooting Common OS Problems"
          },
          {
            "id": 6016,
            "dayNumber": 6,
            "topicTitle": "Class 6: OS Deep Dive Practical Worksheet"
          }
        ]
      },
      {
        "id": 602,
        "chapterNumber": 2,
        "title": "Chapter 2: Spreadsheet Basics & Data Formulas",
        "description": "Rows, columns, cells, SUM, AVERAGE, MIN, MAX, and charts in spreadsheets.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 6021,
            "dayNumber": 7,
            "topicTitle": "Class 7: Introduction to Spreadsheet Grid & Cell Addressing"
          },
          {
            "id": 6022,
            "dayNumber": 8,
            "topicTitle": "Class 8: Entering Data & Formatting Tables"
          },
          {
            "id": 6023,
            "dayNumber": 9,
            "topicTitle": "Class 9: Basic Math Formulas: +, -, *, /"
          },
          {
            "id": 6024,
            "dayNumber": 10,
            "topicTitle": "Class 10: Functions: SUM, AVERAGE, COUNT"
          },
          {
            "id": 6025,
            "dayNumber": 11,
            "topicTitle": "Class 11: Creating Column & Pie Charts"
          },
          {
            "id": 6026,
            "dayNumber": 12,
            "topicTitle": "Class 12: Student Marksheet Spreadsheet Project"
          }
        ]
      },
      {
        "id": 603,
        "chapterNumber": 3,
        "title": "Chapter 3: Python Programming Introduction",
        "description": "Python syntax, print statements, variables, data types, and simple math.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 6031,
            "dayNumber": 13,
            "topicTitle": "Class 13: What is Python & Setting Up IDLE"
          },
          {
            "id": 6032,
            "dayNumber": 14,
            "topicTitle": "Class 14: Print Statements & Output Formatting"
          },
          {
            "id": 6033,
            "dayNumber": 15,
            "topicTitle": "Class 15: Python Variables & Data Types (int, str, float)"
          },
          {
            "id": 6034,
            "dayNumber": 16,
            "topicTitle": "Class 16: User Input with input() Function"
          },
          {
            "id": 6035,
            "dayNumber": 17,
            "topicTitle": "Class 17: Python Arithmetic Operators & Expressions"
          },
          {
            "id": 6036,
            "dayNumber": 18,
            "topicTitle": "Class 18: Simple Calculator Program Project"
          }
        ]
      },
      {
        "id": 604,
        "chapterNumber": 4,
        "title": "Chapter 4: Digital Communication & Email Ethics",
        "description": "Email composition, CC/BCC, attachments, cloud drive sharing, and netiquette.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 6041,
            "dayNumber": 19,
            "topicTitle": "Class 19: Structure of Professional Email Address & Server"
          },
          {
            "id": 6042,
            "dayNumber": 20,
            "topicTitle": "Class 20: Composing Emails: Subject Line, Body & Greetings"
          },
          {
            "id": 6043,
            "dayNumber": 21,
            "topicTitle": "Class 21: Understanding CC, BCC & Email Attachments"
          },
          {
            "id": 6044,
            "dayNumber": 22,
            "topicTitle": "Class 22: Cloud Drive File Sharing & Access Permissions"
          },
          {
            "id": 6045,
            "dayNumber": 23,
            "topicTitle": "Class 23: Spotting Spam & Email Security Rules"
          },
          {
            "id": 6046,
            "dayNumber": 24,
            "topicTitle": "Class 24: Digital Communication Assessment"
          }
        ]
      }
    ]
  },
  {
    "gradeNumber": 7,
    "name": "Class 7 Curriculum",
    "chapters": [
      {
        "id": 701,
        "chapterNumber": 1,
        "title": "Chapter 1: Hardware Components & System Architecture",
        "description": "Internal bus, RAM speeds, graphics cards, power supplies, and periferal ports.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 7011,
            "dayNumber": 1,
            "topicTitle": "Class 1: Computer Bus Architecture & Clock Speed"
          },
          {
            "id": 7012,
            "dayNumber": 2,
            "topicTitle": "Class 2: Dedicated GPU vs Integrated Graphics"
          },
          {
            "id": 7013,
            "dayNumber": 3,
            "topicTitle": "Class 3: Power Supply Units (PSU) & Cooling Systems"
          },
          {
            "id": 7014,
            "dayNumber": 4,
            "topicTitle": "Class 4: Modern Peripheral Interfaces: USB-C, HDMI, PCIe"
          },
          {
            "id": 7015,
            "dayNumber": 5,
            "topicTitle": "Class 5: Assembling a Virtual PC Simulation"
          },
          {
            "id": 7016,
            "dayNumber": 6,
            "topicTitle": "Class 6: Hardware Architecture Practical Exam"
          }
        ]
      },
      {
        "id": 702,
        "chapterNumber": 2,
        "title": "Chapter 2: HTML & Web Page Creation",
        "description": "HTML5 elements, tags, attributes, links, images, tables, and page layout.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 7021,
            "dayNumber": 7,
            "topicTitle": "Class 7: Introduction to HTML & Basic Document Structure"
          },
          {
            "id": 7022,
            "dayNumber": 8,
            "topicTitle": "Class 8: Headings, Paragraphs & Text Formatting Tags"
          },
          {
            "id": 7023,
            "dayNumber": 9,
            "topicTitle": "Class 9: Creating Lists: <ul>, <ol>, and <li>"
          },
          {
            "id": 7024,
            "dayNumber": 10,
            "topicTitle": "Class 10: Adding Hyperlinks <a> & Images <img>"
          },
          {
            "id": 7025,
            "dayNumber": 11,
            "topicTitle": "Class 11: HTML Tables <table>, <tr>, <td>"
          },
          {
            "id": 7026,
            "dayNumber": 12,
            "topicTitle": "Class 12: Building a Personal Web Page Project"
          }
        ]
      },
      {
        "id": 703,
        "chapterNumber": 3,
        "title": "Chapter 3: Python Loops & Conditionals",
        "description": "If-else statements, nested conditionals, for loops, while loops, and range().",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 7031,
            "dayNumber": 13,
            "topicTitle": "Class 13: Conditional Logic: if, elif, else"
          },
          {
            "id": 7032,
            "dayNumber": 14,
            "topicTitle": "Class 14: Relational & Logical Operators in Python"
          },
          {
            "id": 7033,
            "dayNumber": 15,
            "topicTitle": "Class 15: For Loops & range() Function"
          },
          {
            "id": 7034,
            "dayNumber": 16,
            "topicTitle": "Class 16: While Loops & Infinite Loop Prevention"
          },
          {
            "id": 7035,
            "dayNumber": 17,
            "topicTitle": "Class 17: Break & Continue Control Statements"
          },
          {
            "id": 7036,
            "dayNumber": 18,
            "topicTitle": "Class 18: Number Guessing Game Project"
          }
        ]
      },
      {
        "id": 704,
        "chapterNumber": 4,
        "title": "Chapter 4: Artificial Intelligence & Future Tech",
        "description": "Machine learning basics, neural networks introduction, AI ethics, and robotics.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 7041,
            "dayNumber": 19,
            "topicTitle": "Class 19: What is Artificial Intelligence & Machine Learning?"
          },
          {
            "id": 7042,
            "dayNumber": 20,
            "topicTitle": "Class 20: How Computers Learn from Data Sets"
          },
          {
            "id": 7043,
            "dayNumber": 21,
            "topicTitle": "Class 21: Computer Vision & Speech Recognition"
          },
          {
            "id": 7044,
            "dayNumber": 22,
            "topicTitle": "Class 22: AI Ethics, Bias & Job Impact"
          },
          {
            "id": 7045,
            "dayNumber": 23,
            "topicTitle": "Class 23: Robotics & Autonomous Systems"
          },
          {
            "id": 7046,
            "dayNumber": 24,
            "topicTitle": "Class 24: AI Future Tech Innovation Presentation"
          }
        ]
      }
    ]
  },
  {
    "gradeNumber": 8,
    "name": "Class 8 Curriculum",
    "chapters": [
      {
        "id": 801,
        "chapterNumber": 1,
        "title": "Chapter 1: Canva Basics & Graphic Design",
        "description": "Design principles, color theory, canvas dimensions, templates, and posters.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 8011,
            "dayNumber": 1,
            "topicTitle": "Class 1: Design Fundamentals: Alignment, Contrast & Balance"
          },
          {
            "id": 8012,
            "dayNumber": 2,
            "topicTitle": "Class 2: Introduction to Canva Platform & Canvas Types"
          },
          {
            "id": 8013,
            "dayNumber": 3,
            "topicTitle": "Class 3: Typography, Fonts & Text Styling"
          },
          {
            "id": 8014,
            "dayNumber": 4,
            "topicTitle": "Class 4: Color Theory & Palette Combinations"
          },
          {
            "id": 8015,
            "dayNumber": 5,
            "topicTitle": "Class 5: Designing Social Media Banners & Flyers"
          },
          {
            "id": 8016,
            "dayNumber": 6,
            "topicTitle": "Class 6: Creative Graphic Design Portfolio Project"
          }
        ]
      },
      {
        "id": 802,
        "chapterNumber": 2,
        "title": "Chapter 2: Database Management Concepts",
        "description": "DBMS fundamentals, tables, primary keys, relational data, and queries.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 8021,
            "dayNumber": 7,
            "topicTitle": "Class 7: What is a Database? DBMS vs Flat Files"
          },
          {
            "id": 8022,
            "dayNumber": 8,
            "topicTitle": "Class 8: Tables, Records, Fields & Data Types"
          },
          {
            "id": 8023,
            "dayNumber": 9,
            "topicTitle": "Class 9: Primary Keys & Unique Identifiers"
          },
          {
            "id": 8024,
            "dayNumber": 10,
            "topicTitle": "Class 10: Form Design & Data Entry Controls"
          },
          {
            "id": 8025,
            "dayNumber": 11,
            "topicTitle": "Class 11: Introduction to SQL Queries (SELECT, WHERE)"
          },
          {
            "id": 8026,
            "dayNumber": 12,
            "topicTitle": "Class 12: School Library Database Design Project"
          }
        ]
      },
      {
        "id": 803,
        "chapterNumber": 3,
        "title": "Chapter 3: Coding Fundamentals & App Logic",
        "description": "Functions, parameters, return values, array structures, and algorithm design.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 8031,
            "dayNumber": 13,
            "topicTitle": "Class 13: Defining Functions & Modular Code"
          },
          {
            "id": 8032,
            "dayNumber": 14,
            "topicTitle": "Class 14: Function Parameters & Return Values"
          },
          {
            "id": 8033,
            "dayNumber": 15,
            "topicTitle": "Class 15: Introduction to Lists & Arrays"
          },
          {
            "id": 8034,
            "dayNumber": 16,
            "topicTitle": "Class 16: Array Operations: Add, Remove, Search"
          },
          {
            "id": 8035,
            "dayNumber": 17,
            "topicTitle": "Class 17: Algorithm Flowcharts & Pseudocode"
          },
          {
            "id": 8036,
            "dayNumber": 18,
            "topicTitle": "Class 18: Complete Python Mini App Project"
          }
        ]
      },
      {
        "id": 804,
        "chapterNumber": 4,
        "title": "Chapter 4: Presentation & Digital Communication Skills",
        "description": "Public speaking with tech, infographics, video presentations, and digital storytelling.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 8041,
            "dayNumber": 19,
            "topicTitle": "Class 19: Structuring Impactful Digital Presentations"
          },
          {
            "id": 8042,
            "dayNumber": 20,
            "topicTitle": "Class 20: Designing Infographics for Complex Data"
          },
          {
            "id": 8043,
            "dayNumber": 21,
            "topicTitle": "Class 21: Recording & Editing Voiceovers for Slides"
          },
          {
            "id": 8044,
            "dayNumber": 22,
            "topicTitle": "Class 22: Video Presentation Creation Tools"
          },
          {
            "id": 8045,
            "dayNumber": 23,
            "topicTitle": "Class 23: Delivery Techniques & Audience Engagement"
          },
          {
            "id": 8046,
            "dayNumber": 24,
            "topicTitle": "Class 24: Capstone Digital Presentation Showcase"
          }
        ]
      }
    ]
  },
  {
    "gradeNumber": 9,
    "name": "Class 9 Curriculum",
    "chapters": [
      {
        "id": 901,
        "chapterNumber": 1,
        "title": "Chapter 1: Information Technology Applications",
        "description": "IT in healthcare, banking, education, governance, and entertainment.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 9011,
            "dayNumber": 1,
            "topicTitle": "Class 1: Overview of IT-ITeS Industry & Careers"
          },
          {
            "id": 9012,
            "dayNumber": 2,
            "topicTitle": "Class 2: IT in Business, Banking & E-Commerce"
          },
          {
            "id": 9013,
            "dayNumber": 3,
            "topicTitle": "Class 3: IT in Healthcare & Medical Technology"
          },
          {
            "id": 9014,
            "dayNumber": 4,
            "topicTitle": "Class 4: E-Governance Services & Digital Portals"
          },
          {
            "id": 9015,
            "dayNumber": 5,
            "topicTitle": "Class 5: IT Application Research & Report Project"
          }
        ]
      },
      {
        "id": 902,
        "chapterNumber": 2,
        "title": "Chapter 2: Data Entry & Keyboard Skills",
        "description": "Touch typing technique, ergonomics, numeric keypad, and typing speed mastery.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 9021,
            "dayNumber": 6,
            "topicTitle": "Class 6: Touch Typing Ergonomics & Posture"
          },
          {
            "id": 9022,
            "dayNumber": 7,
            "topicTitle": "Class 7: Keypad Navigation & Special Character Speed"
          },
          {
            "id": 9023,
            "dayNumber": 8,
            "topicTitle": "Class 8: Rapid Data Entry Drills & Error Auditing"
          },
          {
            "id": 9024,
            "dayNumber": 9,
            "topicTitle": "Class 9: Speed Measurement (WPM) & Accuracy Benchmarks"
          },
          {
            "id": 9025,
            "dayNumber": 10,
            "topicTitle": "Class 10: Advanced Keyboard Shortcuts & Automation"
          },
          {
            "id": 9026,
            "dayNumber": 11,
            "topicTitle": "Class 11: Data Entry Certification Practical"
          }
        ]
      },
      {
        "id": 903,
        "chapterNumber": 3,
        "title": "Chapter 3: Digital Documentation (Advanced)",
        "description": "Styles, headers, footers, table of contents, mail merge, and track changes.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 9031,
            "dayNumber": 12,
            "topicTitle": "Class 12: Applying & Customizing Styles in Writer"
          },
          {
            "id": 9032,
            "dayNumber": 13,
            "topicTitle": "Class 13: Inserting & Formatting Images, Graphics & Shapes"
          },
          {
            "id": 9033,
            "dayNumber": 14,
            "topicTitle": "Class 14: Creating Custom Templates for Business Documents"
          },
          {
            "id": 9034,
            "dayNumber": 15,
            "topicTitle": "Class 15: Generating Automated Table of Contents"
          },
          {
            "id": 9035,
            "dayNumber": 16,
            "topicTitle": "Class 16: Mail Merge Concept & Recipient List Setup"
          },
          {
            "id": 9036,
            "dayNumber": 17,
            "topicTitle": "Class 17: Executing Mail Merge for Mass Letters Project"
          }
        ]
      },
      {
        "id": 904,
        "chapterNumber": 4,
        "title": "Chapter 4: Electronic Spreadsheet (Advanced)",
        "description": "Data consolidation, Goal Seek, Solver, cell linking, and macro recording.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 9041,
            "dayNumber": 18,
            "topicTitle": "Class 18: Consolidating Data across Multiple Sheets"
          },
          {
            "id": 9042,
            "dayNumber": 19,
            "topicTitle": "Class 19: Creating Subtotals & Data Grouping"
          },
          {
            "id": 9043,
            "dayNumber": 20,
            "topicTitle": "Class 20: What-If Analysis: Goal Seek Tool"
          },
          {
            "id": 9044,
            "dayNumber": 21,
            "topicTitle": "Class 21: Solver Tool & Scenario Manager"
          },
          {
            "id": 9045,
            "dayNumber": 22,
            "topicTitle": "Class 22: Linking Sheet Data & External References"
          },
          {
            "id": 9046,
            "dayNumber": 23,
            "topicTitle": "Class 23: Recording & Executing Macros for Automation"
          }
        ]
      }
    ]
  },
  {
    "gradeNumber": 10,
    "name": "Class 10 Curriculum",
    "chapters": [
      {
        "id": 1001,
        "chapterNumber": 1,
        "title": "Chapter 1: Digital Documentation & Professional Formatting",
        "description": "Advanced document publishing, master documents, and professional layout designs.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 10011,
            "dayNumber": 1,
            "topicTitle": "Class 1: Master Documents & Subdocument Management"
          },
          {
            "id": 10012,
            "dayNumber": 2,
            "topicTitle": "Class 2: Indexing, Footnotes & Cross-Referencing"
          },
          {
            "id": 10013,
            "dayNumber": 3,
            "topicTitle": "Class 3: Track Changes & Document Review Collaboration"
          },
          {
            "id": 10014,
            "dayNumber": 4,
            "topicTitle": "Class 4: Page Column Formatting & Section Breaks"
          },
          {
            "id": 10015,
            "dayNumber": 5,
            "topicTitle": "Class 5: Professional Manual Publishing Project"
          }
        ]
      },
      {
        "id": 1002,
        "chapterNumber": 2,
        "title": "Chapter 2: Electronic Spreadsheet & Data Analysis",
        "description": "Pivot tables, advanced lookup functions (VLOOKUP, XLOOKUP), and data validation.",
        "isLocked": false,
        "dayClasses": [
          {
            "id": 10021,
            "dayNumber": 6,
            "topicTitle": "Class 6: Advanced Data Validation Rules"
          },
          {
            "id": 10022,
            "dayNumber": 7,
            "topicTitle": "Class 7: Pivot Tables & Pivot Charts Creation"
          },
          {
            "id": 10023,
            "dayNumber": 8,
            "topicTitle": "Class 8: VLOOKUP & HLOOKUP Functions"
          },
          {
            "id": 10024,
            "dayNumber": 9,
            "topicTitle": "Class 9: INDEX & MATCH Complex Lookups"
          },
          {
            "id": 10025,
            "dayNumber": 10,
            "topicTitle": "Class 10: Conditional Formatting with Formula Rules"
          },
          {
            "id": 10026,
            "dayNumber": 11,
            "topicTitle": "Class 11: Corporate Financial Model Project"
          }
        ]
      },
      {
        "id": 1003,
        "chapterNumber": 3,
        "title": "Chapter 3: Database Management Systems (RDBMS)",
        "description": "Relational keys, foreign keys, SQL DDL/DML queries, joins, and database design.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 10031,
            "dayNumber": 12,
            "topicTitle": "Class 12: Relational Database Model & Foreign Keys"
          },
          {
            "id": 10032,
            "dayNumber": 13,
            "topicTitle": "Class 13: SQL Data Types & DDL Statements (CREATE, ALTER)"
          },
          {
            "id": 10033,
            "dayNumber": 14,
            "topicTitle": "Class 14: SQL DML Statements (INSERT, UPDATE, DELETE)"
          },
          {
            "id": 10034,
            "dayNumber": 15,
            "topicTitle": "Class 15: SQL Clauses: WHERE, ORDER BY, GROUP BY"
          },
          {
            "id": 10035,
            "dayNumber": 16,
            "topicTitle": "Class 16: Table Joins: INNER JOIN & LEFT JOIN"
          },
          {
            "id": 10036,
            "dayNumber": 17,
            "topicTitle": "Class 17: Enterprise RDBMS Schema Project"
          }
        ]
      },
      {
        "id": 1004,
        "chapterNumber": 4,
        "title": "Chapter 4: Web Applications & Cyber Security",
        "description": "Network topologies, internet security, ergonomics, workplace safety, and cyber law.",
        "isLocked": true,
        "dayClasses": [
          {
            "id": 10041,
            "dayNumber": 18,
            "topicTitle": "Class 18: Computer Networks: LAN, WAN, MAN & Topologies"
          },
          {
            "id": 10042,
            "dayNumber": 19,
            "topicTitle": "Class 19: Internet Security Threats & Firewalls"
          },
          {
            "id": 10043,
            "dayNumber": 20,
            "topicTitle": "Class 20: Workplace Safety & Physical Ergonomics"
          },
          {
            "id": 10044,
            "dayNumber": 21,
            "topicTitle": "Class 21: Cyber Laws, IT Act & Online Rights"
          },
          {
            "id": 10045,
            "dayNumber": 22,
            "topicTitle": "Class 22: Disaster Recovery & Data Backup Strategies"
          },
          {
            "id": 10046,
            "dayNumber": 23,
            "topicTitle": "Class 23: Cyber Security Master Certification Quiz"
          }
        ]
      }
    ]
  }
];

export const getStoredSubmissions = () => {
  const adminData = localStorage.getItem('lms_admin_submissions');
  const studentData = localStorage.getItem('engloray_student_submissions');
  
  let adminSubs = [];
  let studentSubs = [];
  try {
    if (adminData && adminData !== 'undefined') adminSubs = JSON.parse(adminData);
  } catch (e) {}
  try {
    if (studentData && studentData !== 'undefined') studentSubs = JSON.parse(studentData);
  } catch (e) {}

  const map = new Map();
  const combine = [...studentSubs, ...adminSubs];

  combine.forEach(s => {
    if (!s) return;
    const email = (s.studentEmail || s.email || '').toLowerCase().trim();
    if (!email) return;
    const day = s.dayNumber || s.dayClassId || 1;
    let gn = s.gradeNumber;
    if (email === 'student3@school.com' || email === 'newstudent@school.com') gn = 3;
    else if (email === 'student5@school.com' || email === 'newstudent5@school.com') gn = 5;
    else gn = gn || 5;

    const compositeKey = `${email}_grade${gn}_class${day}`;
    const existing = map.get(compositeKey);

    if (!existing) {
      map.set(compositeKey, { ...s, id: s.id || (map.size + 1), studentEmail: email, gradeNumber: gn, dayNumber: day, quizScore: s.quizScore || s.score || 100 });
    } else {
      // Keep approved or newer submission record (deduplicate duplicate submissions)
      const isNewApproved = s.status === 'GRADED' || s.status === 'REVIEWED' || s.status === 'Approved' || s.status === 'APPROVED';
      const isExistingApproved = existing.status === 'GRADED' || existing.status === 'REVIEWED' || existing.status === 'Approved' || existing.status === 'APPROVED';
      
      if (isNewApproved && !isExistingApproved) {
        map.set(compositeKey, { ...s, id: existing.id, studentEmail: email, gradeNumber: gn, dayNumber: day });
      } else if (isNewApproved === isExistingApproved && new Date(s.submittedAt || 0) >= new Date(existing.submittedAt || 0)) {
        map.set(compositeKey, { ...s, id: existing.id, studentEmail: email, gradeNumber: gn, dayNumber: day });
      }
    }
  });

  const merged = Array.from(map.values());
  localStorage.setItem('lms_admin_submissions', JSON.stringify(merged));
  localStorage.setItem('engloray_student_submissions', JSON.stringify(merged));
  return merged.length > 0 ? merged : INITIAL_SUBMISSIONS;
};

export const saveStoredSubmissions = (submissions) => {
  localStorage.setItem('lms_admin_submissions', JSON.stringify(submissions));
  localStorage.setItem('engloray_student_submissions', JSON.stringify(submissions));
};

export const getStoredStudents = () => {
  const data = localStorage.getItem('lms_admin_students');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(st => {
          let gn = st.gradeNumber;
          if (st.email) {
            const lower = st.email.toLowerCase();
            if (lower === 'student3@school.com' || lower === 'newstudent@school.com') gn = 3;
            else if (lower === 'student5@school.com' || lower === 'newstudent5@school.com') gn = 5;
          }
          return { ...st, gradeNumber: gn || 3, currentClassNumber: st.currentClassNumber || st.classNumber || 1 };
        });
      }
    } catch (e) {}
  }
  return INITIAL_STUDENTS;
};

export const getStoredCourses = () => {
  const data = localStorage.getItem('lms_admin_courses');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length >= 8) {
        return parsed;
      }
    } catch(e) {}
  }
  localStorage.setItem('lms_admin_courses', JSON.stringify(INITIAL_COURSES));
  return INITIAL_COURSES;
};

export const getStoredAdmins = () => {
  const data = localStorage.getItem('lms_admin_admins');
  if (data && data !== 'undefined') {
    try {
      return JSON.parse(data);
    } catch (e) {}
  }
  return INITIAL_ADMINS;
};

export const saveStoredAdmins = (admins) => {
  localStorage.setItem('lms_admin_admins', JSON.stringify(admins));
};
