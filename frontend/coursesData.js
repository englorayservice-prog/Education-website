/* ==========================================================================
   ENGLORAY LEARNING - CENTRAL COURSES MASTER DATASET (GRADES 3 TO 10)
   Contains Complete Daily Classes for All Grades (3 to 10), 5 Quiz Questions per Class
   ========================================================================== */

const COURSES_DATA = {
  currentGradeNumber: 5,
  currentTermNumber: 1,
  currentChapterNumber: 1,
  
  // Default Active Chapter Classes List (Grade 5 Chapter 1 - 4 Classes)
  classes: [
    {
      id: 6,
      dayNumber: 1,
      title: "Class 1: Computer Fundamentals, Hardware Devices & Computer System",
      description: "Topics Covered: Introduction to Computers, Computer Fundamentals, Computer System, Hardware Devices, Internal Hardware, External Hardware, Functions of Hardware Devices, Input, Output and Storage Overview.",
      isUnlockedByAdmin: true,
      prerequisiteDayNumber: null,
      steps: {
        step1Video: {
          title: "Step 1: Watch Class Video",
          description: "Watch the complete lesson video to master topic concepts.",
          videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
        },
        step2TopicPdf: {
          title: "Step 2: Review Topics Covered",
          description: "Read through the detailed topic documentation and reference material.",
          pdfUrl: "/asset/5th class/chapter 1/class 1/TOPIC COVERED.pdf",
          fileName: "TOPIC COVERED.pdf",
          keyConcepts: [
            "Computer System: Combination of hardware and software working together.",
            "Internal Hardware: CPU, Motherboard, RAM, Hard Disk drive.",
            "External Peripherals: Monitor, Keyboard, Mouse, Printer, Scanner."
]
        },
        step3Website: {
          title: "Step 3: Interactive Learning Activity",
          description: "Explore the interactive educational website portal for hands-on practice.",
          websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
          portalName: "GeeksforGeeks Educational Portal"
        },
        step4Quiz: {
          title: "Step 4: Concept Check Quiz",
          description: "Test your understanding of the class topics. All 5 questions must be answered. Passing score is 80%.",
          passingScorePercent: 80,
          question: "1. Which component is considered internal hardware inside the CPU cabinet?",
          options: [
            {
                        "id": 611,
                        "text": "Motherboard & RAM",
                        "isCorrect": true
            },
            {
                        "id": 612,
                        "text": "External Desktop Speakers",
                        "isCorrect": false
            },
            {
                        "id": 613,
                        "text": "USB Flash Drive",
                        "isCorrect": false
            }
],
          questions: [
            {
                        "id": 61,
                        "question": "1. Which component is considered internal hardware inside the CPU cabinet?",
                        "options": [
                                    {
                                                "id": 611,
                                                "text": "Motherboard & RAM",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 612,
                                                "text": "External Desktop Speakers",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 613,
                                                "text": "USB Flash Drive",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 62,
                        "question": "2. What is the physical machinery and electronic parts of a computer called?",
                        "options": [
                                    {
                                                "id": 621,
                                                "text": "Hardware",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 622,
                                                "text": "Software",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 623,
                                                "text": "Web Browser",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 63,
                        "question": "3. Which internal board connects the CPU, memory, and expansion slots?",
                        "options": [
                                    {
                                                "id": 631,
                                                "text": "Motherboard",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 632,
                                                "text": "Mouse Pad",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 633,
                                                "text": "Screen Protector",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 64,
                        "question": "4. Which peripheral device is used to scan paper documents into digital images?",
                        "options": [
                                    {
                                                "id": 641,
                                                "text": "Scanner",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 642,
                                                "text": "Speaker",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 643,
                                                "text": "Projector",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 65,
                        "question": "5. What combination forms a fully operational Computer System?",
                        "options": [
                                    {
                                                "id": 651,
                                                "text": "Hardware + Software",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 652,
                                                "text": "Monitor + Paper",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 653,
                                                "text": "Cable + Plastic Box",
                                                "isCorrect": false
                                    }
                        ]
            }
]
        },
        step5Task: {
          title: "Step 5: Practical Activity & Task Submission",
          description: "Complete the practical worksheet and submit your work.",
          instructions: "Class 1: Hardware Device Identification & Picture Matching Worksheet.",
          pdfUrl: "/asset/5th class/chapter 1/class 1/practical activities.pdf",
          fileName: "practical activities.pdf"
        }
      }
    },
    {
      id: 7,
      dayNumber: 2,
      title: "Class 2: Input, Output & Storage Devices in Daily Life",
      description: "Topics Covered: Input Devices, Output Devices, Storage Devices, Keyboard, Mouse, Scanner, Microphone, Webcam, Monitor, Printer, Speakers, Hard Disk, Pen Drive.",
      isUnlockedByAdmin: true,
      prerequisiteDayNumber: 1,
      steps: {
        step1Video: {
          title: "Step 1: Watch Class Video",
          description: "Watch the complete lesson video to master topic concepts.",
          videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
        },
        step2TopicPdf: {
          title: "Step 2: Review Topics Covered",
          description: "Read through the detailed topic documentation and reference material.",
          pdfUrl: "/asset/5th class/chapter 1/class 2/TOPIC COVERED.pdf",
          fileName: "TOPIC COVERED.pdf",
          keyConcepts: [
            "Input Devices: Keyboard, Mouse, Scanner, Microphone, Webcam.",
            "Output Devices: Monitor, Printer, Speakers, Headphones, Projector.",
            "Storage Media: Hard Disk Drive, Solid State Drive, USB Flash Drive, SD Cards."
]
        },
        step3Website: {
          title: "Step 3: Interactive Learning Activity",
          description: "Explore the interactive educational website portal for hands-on practice.",
          websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
          portalName: "GeeksforGeeks Educational Portal"
        },
        step4Quiz: {
          title: "Step 4: Concept Check Quiz",
          description: "Test your understanding of the class topics. All 5 questions must be answered. Passing score is 80%.",
          passingScorePercent: 80,
          question: "1. Which device is primarily used to enter text into a computer?",
          options: [
            {
                        "id": 711,
                        "text": "Keyboard",
                        "isCorrect": true
            },
            {
                        "id": 712,
                        "text": "Monitor",
                        "isCorrect": false
            },
            {
                        "id": 713,
                        "text": "Speakers",
                        "isCorrect": false
            }
],
          questions: [
            {
                        "id": 71,
                        "question": "1. Which device is primarily used to enter text into a computer?",
                        "options": [
                                    {
                                                "id": 711,
                                                "text": "Keyboard",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 712,
                                                "text": "Monitor",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 713,
                                                "text": "Speakers",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 72,
                        "question": "2. Which of the following is an Output device?",
                        "options": [
                                    {
                                                "id": 721,
                                                "text": "Printer",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 722,
                                                "text": "Webcam",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 723,
                                                "text": "Microphone",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 73,
                        "question": "3. Which device records human voice and audio input?",
                        "options": [
                                    {
                                                "id": 731,
                                                "text": "Microphone",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 732,
                                                "text": "Hard Disk",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 733,
                                                "text": "Mouse",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 74,
                        "question": "4. Which portable storage media plugs into a USB port?",
                        "options": [
                                    {
                                                "id": 741,
                                                "text": "USB Flash Drive / Pen Drive",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 742,
                                                "text": "RAM Chip",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 743,
                                                "text": "CPU Fan",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 75,
                        "question": "5. Which device projects video onto a large classroom screen?",
                        "options": [
                                    {
                                                "id": 751,
                                                "text": "Digital Projector",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 752,
                                                "text": "Barcode Reader",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 753,
                                                "text": "Trackball",
                                                "isCorrect": false
                                    }
                        ]
            }
]
        },
        step5Task: {
          title: "Step 5: Practical Activity & Task Submission",
          description: "Complete the practical worksheet and submit your work.",
          instructions: "Class 2: Input, Output & Storage Device Sorting Worksheet.",
          pdfUrl: "/asset/5th class/chapter 1/class 2/practical activities.pdf",
          fileName: "practical activities.pdf"
        }
      }
    },
    {
      id: 8,
      dayNumber: 3,
      title: "Class 3: Computer Care, Digital Ethics & Responsible Technology Use",
      description: "Topics Covered: Maintenance, Virus Protection, Safe Browsing Habits, Digital Hygiene, Ergonomics, Screen Time Balance.",
      isUnlockedByAdmin: false,
      prerequisiteDayNumber: 2,
      steps: {
        step1Video: {
          title: "Step 1: Watch Class Video",
          description: "Watch the complete lesson video to master topic concepts.",
          videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
        },
        step2TopicPdf: {
          title: "Step 2: Review Topics Covered",
          description: "Read through the detailed topic documentation and reference material.",
          pdfUrl: "/asset/5th class/chapter 1/class 1/TOPIC COVERED.pdf",
          fileName: "TOPIC COVERED.pdf",
          keyConcepts: [
            "Antivirus software protects computer from malicious threats.",
            "Strong passwords protect online account security."
]
        },
        step3Website: {
          title: "Step 3: Interactive Learning Activity",
          description: "Explore the interactive educational website portal for hands-on practice.",
          websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
          portalName: "GeeksforGeeks Educational Portal"
        },
        step4Quiz: {
          title: "Step 4: Concept Check Quiz",
          description: "Test your understanding of the class topics. All 5 questions must be answered. Passing score is 80%.",
          passingScorePercent: 80,
          question: "1. What software protects computers from malicious virus infections?",
          options: [
            {
                        "id": 811,
                        "text": "Antivirus Software",
                        "isCorrect": true
            },
            {
                        "id": 812,
                        "text": "Calculator",
                        "isCorrect": false
            },
            {
                        "id": 813,
                        "text": "Media Player",
                        "isCorrect": false
            }
],
          questions: [
            {
                        "id": 81,
                        "question": "1. What software protects computers from malicious virus infections?",
                        "options": [
                                    {
                                                "id": 811,
                                                "text": "Antivirus Software",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 812,
                                                "text": "Calculator",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 813,
                                                "text": "Media Player",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 82,
                        "question": "2. What is a good practice for creating online account passwords?",
                        "options": [
                                    {
                                                "id": 821,
                                                "text": "Use a mix of letters, numbers, and symbols",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 822,
                                                "text": "Use 123456 for all accounts",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 823,
                                                "text": "Share password with strangers",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 83,
                        "question": "3. What should you do if an unknown suspicious link pops up while browsing?",
                        "options": [
                                    {
                                                "id": 831,
                                                "text": "Do not click and close the window",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 832,
                                                "text": "Click it immediately",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 833,
                                                "text": "Share it with everyone",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 84,
                        "question": "4. What term describes good posture and ergonomic desk setup?",
                        "options": [
                                    {
                                                "id": 841,
                                                "text": "Computer Ergonomics",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 842,
                                                "text": "Over-clocking",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 843,
                                                "text": "Disk Format",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 85,
                        "question": "5. Why should computers be shut down properly from the Start menu?",
                        "options": [
                                    {
                                                "id": 851,
                                                "text": "To safely close open files and prevent data corruption",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 852,
                                                "text": "To make the monitor brighter",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 853,
                                                "text": "To erase all homework",
                                                "isCorrect": false
                                    }
                        ]
            }
]
        },
        step5Task: {
          title: "Step 5: Practical Activity & Task Submission",
          description: "Complete the practical worksheet and submit your work.",
          instructions: "Class 3: Digital Care & Ergonomics Safety Checklist Worksheet.",
          pdfUrl: "/asset/5th class/chapter 1/class 1/practical activities.pdf",
          fileName: "practical activities.pdf"
        }
      }
    },
    {
      id: 9,
      dayNumber: 4,
      title: "Class 4: Revision, Discussion & Assessment",
      description: "Topics Covered: Chapter 1 Summary, Practical Assessment Review, Oral Q&A, Final Quiz Evaluation.",
      isUnlockedByAdmin: false,
      prerequisiteDayNumber: 3,
      steps: {
        step1Video: {
          title: "Step 1: Watch Class Video",
          description: "Watch the complete lesson video to master topic concepts.",
          videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
        },
        step2TopicPdf: {
          title: "Step 2: Review Topics Covered",
          description: "Read through the detailed topic documentation and reference material.",
          pdfUrl: "/asset/5th class/chapter 1/class 2/TOPIC COVERED.pdf",
          fileName: "TOPIC COVERED.pdf",
          keyConcepts: [
            "Hardware and software work together as a system.",
            "Review core concepts for final mastery."
]
        },
        step3Website: {
          title: "Step 3: Interactive Learning Activity",
          description: "Explore the interactive educational website portal for hands-on practice.",
          websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
          portalName: "GeeksforGeeks Educational Portal"
        },
        step4Quiz: {
          title: "Step 4: Concept Check Quiz",
          description: "Test your understanding of the class topics. All 5 questions must be answered. Passing score is 80%.",
          passingScorePercent: 80,
          question: "1. What stores long term files when the computer is turned off?",
          options: [
            {
                        "id": 911,
                        "text": "Hard Disk Drive / SSD",
                        "isCorrect": true
            },
            {
                        "id": 912,
                        "text": "Mouse Pad",
                        "isCorrect": false
            },
            {
                        "id": 913,
                        "text": "RAM Cache",
                        "isCorrect": false
            }
],
          questions: [
            {
                        "id": 91,
                        "question": "1. What stores long term files when the computer is turned off?",
                        "options": [
                                    {
                                                "id": 911,
                                                "text": "Hard Disk Drive / SSD",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 912,
                                                "text": "Mouse Pad",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 913,
                                                "text": "RAM Cache",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 92,
                        "question": "2. Which device displays visual graphics and text output?",
                        "options": [
                                    {
                                                "id": 921,
                                                "text": "Monitor Screen",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 922,
                                                "text": "Keyboard",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 923,
                                                "text": "Scanner",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 93,
                        "question": "3. What component processes all instructions and calculations?",
                        "options": [
                                    {
                                                "id": 931,
                                                "text": "CPU (Processor)",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 932,
                                                "text": "Power Cord",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 933,
                                                "text": "Webcam Lens",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 94,
                        "question": "4. What device captures live video for video calls?",
                        "options": [
                                    {
                                                "id": 941,
                                                "text": "Webcam",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 942,
                                                "text": "Laser Printer",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 943,
                                                "text": "Barcode Reader",
                                                "isCorrect": false
                                    }
                        ]
            },
            {
                        "id": 95,
                        "question": "5. What device outputs sound effects and music?",
                        "options": [
                                    {
                                                "id": 951,
                                                "text": "Speakers / Headphones",
                                                "isCorrect": true
                                    },
                                    {
                                                "id": 952,
                                                "text": "Scanner",
                                                "isCorrect": false
                                    },
                                    {
                                                "id": 953,
                                                "text": "Microphone",
                                                "isCorrect": false
                                    }
                        ]
            }
]
        },
        step5Task: {
          title: "Step 5: Practical Activity & Task Submission",
          description: "Complete the practical worksheet and submit your work.",
          instructions: "Class 4: Chapter 1 Summary & Revision Assessment Worksheet.",
          pdfUrl: "/asset/5th class/chapter 1/class 2/practical activities.pdf",
          fileName: "practical activities.pdf"
        }
      }
    }
  ],

  // Full Curriculum Hierarchy (Grades 3 to 10 - ALL Classes Included)
  grades: [
    {
      gradeNumber: 3,
      gradeName: "Grade 3",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Chapter 1: Computer Fundamentals",
          description: "What is a computer, main computer parts, sitting posture & computer safety.",
          classes: [
            {
              id: 301,
              dayNumber: 1,
              title: "Class 1: What is a Computer? Uses of Computers in Daily Life",
              description: "Introduction to electronic machines, where computers are used (schools, hospitals, banks), and desktop overview.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: null,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS 1/Topics Covered.docx",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Computers process data to perform daily tasks.", "Found in schools, hospitals, banks, and homes."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
                  portalName: "GeeksforGeeks Educational Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which of the following is an electronic machine?",
                  options: [{"id": 30111, "text": "Computer", "isCorrect": true}, {"id": 30112, "text": "Wooden Chair", "isCorrect": false}, {"id": 30113, "text": "Paper Book", "isCorrect": false}],
                  questions: [{"id": 3011, "question": "1. Which of the following is an electronic machine?", "options": [{"id": 30111, "text": "Computer", "isCorrect": true}, {"id": 30112, "text": "Wooden Chair", "isCorrect": false}, {"id": 30113, "text": "Paper Book", "isCorrect": false}]}, {"id": 3012, "question": "2. Where are computers used to keep patient records?", "options": [{"id": 30121, "text": "Hospitals", "isCorrect": true}, {"id": 30122, "text": "Playgrounds", "isCorrect": false}, {"id": 30123, "text": "Swimming Pools", "isCorrect": false}]}, {"id": 3013, "question": "3. What can a computer do faster than humans?", "options": [{"id": 30131, "text": "Perform math calculations", "isCorrect": true}, {"id": 30132, "text": "Eat food", "isCorrect": false}, {"id": 30133, "text": "Sleep at night", "isCorrect": false}]}, {"id": 3014, "question": "4. Which place uses computers to teach students and display lessons?", "options": [{"id": 30141, "text": "Schools & Classrooms", "isCorrect": true}, {"id": 30142, "text": "Bus Stop", "isCorrect": false}, {"id": 30143, "text": "Fruit Shop", "isCorrect": false}]}, {"id": 3015, "question": "5. A desktop computer is designed to stay on top of a...", "options": [{"id": 30151, "text": "Desk or Table", "isCorrect": true}, {"id": 30152, "text": "Pocket", "isCorrect": false}, {"id": 30153, "text": "Tree Branch", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 1: Computer Picture Identification & Uses Matching Activity.",
                  pdfUrl: "/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS 1/Practical  Activities.docx",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 302,
              dayNumber: 2,
              title: "Class 2: Main Parts of a Computer (Monitor, Keyboard, Mouse, CPU)",
              description: "Learn CPU box, display screen, keyboard keys, and mouse clicking techniques.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: 1,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS 2/Topic Covered.docx",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["CPU is the brain of the computer.", "Keyboard helps type letters and numbers."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
                  portalName: "GeeksforGeeks Educational Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What is known as the brain of the computer?",
                  options: [{"id": 30211, "text": "CPU (Central Processing Unit)", "isCorrect": true}, {"id": 30212, "text": "Monitor Screen", "isCorrect": false}, {"id": 30213, "text": "Speakers", "isCorrect": false}],
                  questions: [{"id": 3021, "question": "1. What is known as the brain of the computer?", "options": [{"id": 30211, "text": "CPU (Central Processing Unit)", "isCorrect": true}, {"id": 30212, "text": "Monitor Screen", "isCorrect": false}, {"id": 30213, "text": "Speakers", "isCorrect": false}]}, {"id": 3022, "question": "2. Which computer part has many buttons called keys?", "options": [{"id": 30221, "text": "Keyboard", "isCorrect": true}, {"id": 30222, "text": "Mouse", "isCorrect": false}, {"id": 30223, "text": "Scanner", "isCorrect": false}]}, {"id": 3023, "question": "3. Which part displays pictures and video like a television?", "options": [{"id": 30231, "text": "Monitor", "isCorrect": true}, {"id": 30232, "text": "CPU", "isCorrect": false}, {"id": 30233, "text": "Printer", "isCorrect": false}]}, {"id": 3024, "question": "4. Which small device is clicked to select items on screen?", "options": [{"id": 30241, "text": "Mouse", "isCorrect": true}, {"id": 30242, "text": "Keyboard", "isCorrect": false}, {"id": 30243, "text": "Speaker", "isCorrect": false}]}, {"id": 3025, "question": "5. How many main core hardware parts make up a basic desktop setup?", "options": [{"id": 30251, "text": "4 Parts (Monitor, CPU, Keyboard, Mouse)", "isCorrect": true}, {"id": 30252, "text": "1 Part", "isCorrect": false}, {"id": 30253, "text": "100 Parts", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 2: Label the Computer Parts Diagram Worksheet.",
                  pdfUrl: "/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS 2/Practical Activities.docx",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 303,
              dayNumber: 3,
              title: "Class 3: Computer Care, Lab Rules & Sitting Posture",
              description: "Lab safety rules, proper posture, keeping equipment dust-free, and safe handling.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 2,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS 3/TOPIC COVERED.docx",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Sit straight while using a computer.", "Do not eat or drink near computer equipment."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
                  portalName: "GeeksforGeeks Educational Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What is a key rule when sitting at a computer desk?",
                  options: [{"id": 30311, "text": "Sit upright with back supported", "isCorrect": true}, {"id": 30312, "text": "Slouch forward completely", "isCorrect": false}, {"id": 30313, "text": "Lie down on the floor", "isCorrect": false}],
                  questions: [{"id": 3031, "question": "1. What is a key rule when sitting at a computer desk?", "options": [{"id": 30311, "text": "Sit upright with back supported", "isCorrect": true}, {"id": 30312, "text": "Slouch forward completely", "isCorrect": false}, {"id": 30313, "text": "Lie down on the floor", "isCorrect": false}]}, {"id": 3032, "question": "2. Should food or water be kept near the computer keyboard?", "options": [{"id": 30321, "text": "No, keep food away to prevent damage", "isCorrect": true}, {"id": 30322, "text": "Yes, spill water on keys", "isCorrect": false}, {"id": 30323, "text": "Store soup on the CPU box", "isCorrect": false}]}, {"id": 3033, "question": "3. How should computer screens be cleaned?", "options": [{"id": 30331, "text": "Soft dry micro-fiber cloth", "isCorrect": true}, {"id": 30332, "text": "Rough sandpaper", "isCorrect": false}, {"id": 30333, "text": "Soapy wet sponge", "isCorrect": false}]}, {"id": 3034, "question": "4. What should you do before touching power cables in computer lab?", "options": [{"id": 30341, "text": "Ask teacher for assistance", "isCorrect": true}, {"id": 30342, "text": "Pull wires forcefully", "isCorrect": false}, {"id": 30343, "text": "Touch with wet hands", "isCorrect": false}]}, {"id": 3035, "question": "5. What protects computer parts from dust when not in use?", "options": [{"id": 30351, "text": "Dust covers", "isCorrect": true}, {"id": 30352, "text": "Open windows", "isCorrect": false}, {"id": 30353, "text": "Water spray", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 3: Computer Lab Safety & Sitting Posture Matching Activity.",
                  pdfUrl: "/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS 3/practical activities.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 304,
              dayNumber: 4,
              title: "Class 4: Chapter Revision & Oral Discussion",
              description: "Comprehensive review of Chapter 1 concepts, interactive Q&A discussion, and assessment.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 3,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS 4/TOPIC COVERED.docx",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Review all core components.", "Self-assessment and concept mastery check."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
                  portalName: "GeeksforGeeks Educational Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What combines hardware and software to process data?",
                  options: [{"id": 30411, "text": "Computer System", "isCorrect": true}, {"id": 30412, "text": "Chalkboard", "isCorrect": false}, {"id": 30413, "text": "Calculator", "isCorrect": false}],
                  questions: [{"id": 3041, "question": "1. What combines hardware and software to process data?", "options": [{"id": 30411, "text": "Computer System", "isCorrect": true}, {"id": 30412, "text": "Chalkboard", "isCorrect": false}, {"id": 30413, "text": "Calculator", "isCorrect": false}]}, {"id": 3042, "question": "2. Which device inputs sound into the computer system?", "options": [{"id": 30421, "text": "Microphone", "isCorrect": true}, {"id": 30422, "text": "Printer", "isCorrect": false}, {"id": 30423, "text": "Monitor", "isCorrect": false}]}, {"id": 3043, "question": "3. Which hardware device prints hard copies on paper?", "options": [{"id": 30431, "text": "Printer", "isCorrect": true}, {"id": 30432, "text": "Mouse", "isCorrect": false}, {"id": 30433, "text": "Headphones", "isCorrect": false}]}, {"id": 3044, "question": "4. What key is pressed to start a new line while typing text?", "options": [{"id": 30441, "text": "Enter Key", "isCorrect": true}, {"id": 30442, "text": "Spacebar", "isCorrect": false}, {"id": 30443, "text": "Escape Key", "isCorrect": false}]}, {"id": 3045, "question": "5. What long bar at the bottom of keyboard adds spaces between words?", "options": [{"id": 30451, "text": "Spacebar", "isCorrect": true}, {"id": 30452, "text": "Shift Key", "isCorrect": false}, {"id": 30453, "text": "Backspace", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 4: Chapter 1 Revision Quiz & Concept Summary Worksheet.",
                  pdfUrl: "/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS 4/practical activities.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            }
          ]
        }
      ]
    },
    {
      gradeNumber: 4,
      gradeName: "Grade 4",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Chapter 1: Computer Basics & Operating System",
          description: "Hardware vs Software, Windows Desktop, Files, Folders, and Mouse Gestures.",
          classes: [
            {
              id: 401,
              dayNumber: 1,
              title: "Class 1: Computer Systems & Core Functions",
              description: "Introduction to computer system components and the input-process-output data flow.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: null,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/4th class/Chapter-1/1/TOPIC COVERED.docx",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Input -> Process -> Output cycle.", "Data is converted into meaningful information."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/operating-systems/",
                  portalName: "GeeksforGeeks OS Resource"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What is the first stage of data flow in a computer system?",
                  options: [{"id": 40111, "text": "Input", "isCorrect": true}, {"id": 40112, "text": "Output", "isCorrect": false}, {"id": 40113, "text": "Printout", "isCorrect": false}],
                  questions: [{"id": 4011, "question": "1. What is the first stage of data flow in a computer system?", "options": [{"id": 40111, "text": "Input", "isCorrect": true}, {"id": 40112, "text": "Output", "isCorrect": false}, {"id": 40113, "text": "Printout", "isCorrect": false}]}, {"id": 4012, "question": "2. Which component carries out data processing?", "options": [{"id": 40121, "text": "CPU Processor", "isCorrect": true}, {"id": 40122, "text": "Mouse Pad", "isCorrect": false}, {"id": 40123, "text": "Headphones", "isCorrect": false}]}, {"id": 4013, "question": "3. What is processed data called once it becomes useful?", "options": [{"id": 40131, "text": "Information", "isCorrect": true}, {"id": 40132, "text": "Raw Garbage", "isCorrect": false}, {"id": 40133, "text": "Electricity", "isCorrect": false}]}, {"id": 4014, "question": "4. Which device provides output to the user?", "options": [{"id": 40141, "text": "Monitor or Printer", "isCorrect": true}, {"id": 40142, "text": "Keyboard", "isCorrect": false}, {"id": 40143, "text": "Scanner", "isCorrect": false}]}, {"id": 4015, "question": "5. What order represents the correct data processing cycle?", "options": [{"id": 40151, "text": "Input -> Process -> Output -> Storage", "isCorrect": true}, {"id": 40152, "text": "Output -> Input -> Delete", "isCorrect": false}, {"id": 40153, "text": "Storage -> Output -> Input", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 1: Input-Process-Output Flowchart Assignment.",
                  pdfUrl: "/asset/4th class/Chapter-1/1/practical activities.docx",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 402,
              dayNumber: 2,
              title: "Class 2: Hardware vs Software Concepts",
              description: "Understanding system software, application programs, and physical peripheral devices.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: 1,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/4th class/Chapter-1/1/TOPIC COVERED.docx",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Software provides instructions to hardware.", "System software controls computer operations."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/operating-systems/",
                  portalName: "GeeksforGeeks OS Resource"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What is the set of programs that tells hardware how to work called?",
                  options: [{"id": 40211, "text": "Software", "isCorrect": true}, {"id": 40212, "text": "Plastic Cover", "isCorrect": false}, {"id": 40213, "text": "Monitor Glass", "isCorrect": false}],
                  questions: [{"id": 4021, "question": "1. What is the set of programs that tells hardware how to work called?", "options": [{"id": 40211, "text": "Software", "isCorrect": true}, {"id": 40212, "text": "Plastic Cover", "isCorrect": false}, {"id": 40213, "text": "Monitor Glass", "isCorrect": false}]}, {"id": 4022, "question": "2. Which of the following is System Software?", "options": [{"id": 40221, "text": "Operating System (Windows)", "isCorrect": true}, {"id": 40222, "text": "Computer Keyboard", "isCorrect": false}, {"id": 40223, "text": "Mouse Pad", "isCorrect": false}]}, {"id": 4023, "question": "3. Which of the following is Application Software?", "options": [{"id": 40231, "text": "MS Paint / Calculator", "isCorrect": true}, {"id": 40232, "text": "Hard Disk Drive", "isCorrect": false}, {"id": 40233, "text": "RAM Chip", "isCorrect": false}]}, {"id": 4024, "question": "4. Can a computer run applications without an Operating System?", "options": [{"id": 40241, "text": "No, OS is required to run computer", "isCorrect": true}, {"id": 40242, "text": "Yes, OS is never needed", "isCorrect": false}, {"id": 40243, "text": "Only on weekends", "isCorrect": false}]}, {"id": 4025, "question": "5. Which hardware component stores installed software programs?", "options": [{"id": 40251, "text": "Hard Disk / SSD Storage", "isCorrect": true}, {"id": 40252, "text": "Mouse Wheel", "isCorrect": false}, {"id": 40253, "text": "Speaker Cable", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 2: Hardware vs Software Classification Worksheet.",
                  pdfUrl: "/asset/4th class/Chapter-1/1/practical activities.docx",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 403,
              dayNumber: 3,
              title: "Class 3: Operating System & Windows Desktop Interface",
              description: "Desktop elements, taskbar, start menu, desktop icons, and window controls.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 2,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/4th class/Chapter-1/1/TOPIC COVERED.docx",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Desktop is the main screen after booting.", "Taskbar displays open programs."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/operating-systems/",
                  portalName: "GeeksforGeeks OS Resource"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What is the first main screen that appears after turning on a PC?",
                  options: [{"id": 40311, "text": "Desktop Screen", "isCorrect": true}, {"id": 40312, "text": "Printer Page", "isCorrect": false}, {"id": 40313, "text": "Shutdown Screen", "isCorrect": false}],
                  questions: [{"id": 4031, "question": "1. What is the first main screen that appears after turning on a PC?", "options": [{"id": 40311, "text": "Desktop Screen", "isCorrect": true}, {"id": 40312, "text": "Printer Page", "isCorrect": false}, {"id": 40313, "text": "Shutdown Screen", "isCorrect": false}]}, {"id": 4032, "question": "2. What long bar is located at the bottom of Windows desktop screen?", "options": [{"id": 40321, "text": "Taskbar", "isCorrect": true}, {"id": 40322, "text": "Scrollbar", "isCorrect": false}, {"id": 40323, "text": "Titlebar", "isCorrect": false}]}, {"id": 4033, "question": "3. Small graphic pictures on desktop representing apps are called...", "options": [{"id": 40331, "text": "Icons", "isCorrect": true}, {"id": 40332, "text": "Stickers", "isCorrect": false}, {"id": 40333, "text": "Wallpapers", "isCorrect": false}]}, {"id": 4034, "question": "4. Which button opens the Start Menu to find installed programs?", "options": [{"id": 40341, "text": "Start Button / Windows Logo", "isCorrect": true}, {"id": 40342, "text": "Right Click Menu", "isCorrect": false}, {"id": 40343, "text": "Power Plug", "isCorrect": false}]}, {"id": 4035, "question": "5. What button shrinks a program window to the taskbar?", "options": [{"id": 40351, "text": "Minimize Button (-)", "isCorrect": true}, {"id": 40352, "text": "Close Button (X)", "isCorrect": false}, {"id": 40353, "text": "Maximize Button ([])", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 3: Label Desktop Elements & Taskbar Icons Diagram.",
                  pdfUrl: "/asset/4th class/Chapter-1/1/practical activities.docx",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 404,
              dayNumber: 4,
              title: "Class 4: File & Folder Management Basics",
              description: "Creating folders, saving files, renaming, copying, and organizing digital documents.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 3,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/4th class/Chapter-1/1/TOPIC COVERED.docx",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Folders organize multiple digital files.", "File extension indicates document type."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/operating-systems/",
                  portalName: "GeeksforGeeks OS Resource"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What digital container is used to store and organize related files?",
                  options: [{"id": 40411, "text": "Folder", "isCorrect": true}, {"id": 40412, "text": "Wallpaper", "isCorrect": false}, {"id": 40413, "text": "Screen Saver", "isCorrect": false}],
                  questions: [{"id": 4041, "question": "1. What digital container is used to store and organize related files?", "options": [{"id": 40411, "text": "Folder", "isCorrect": true}, {"id": 40412, "text": "Wallpaper", "isCorrect": false}, {"id": 40413, "text": "Screen Saver", "isCorrect": false}]}, {"id": 4042, "question": "2. What keyboard shortcut copies selected files to clipboard?", "options": [{"id": 40421, "text": "Ctrl + C", "isCorrect": true}, {"id": 40422, "text": "Ctrl + Z", "isCorrect": false}, {"id": 40423, "text": "Alt + F4", "isCorrect": false}]}, {"id": 4043, "question": "3. What keyboard shortcut pastes copied files into a folder?", "options": [{"id": 40431, "text": "Ctrl + V", "isCorrect": true}, {"id": 40432, "text": "Ctrl + P", "isCorrect": false}, {"id": 40433, "text": "Ctrl + A", "isCorrect": false}]}, {"id": 4044, "question": "4. What happens when a file is moved to the Recycle Bin?", "options": [{"id": 40441, "text": "It is temporarily deleted and can be restored", "isCorrect": true}, {"id": 40442, "text": "It prints automatically", "isCorrect": false}, {"id": 40443, "text": "It sends an email", "isCorrect": false}]}, {"id": 4045, "question": "5. What key is pressed to rename a selected file or folder?", "options": [{"id": 40451, "text": "F2 Key", "isCorrect": true}, {"id": 40452, "text": "F5 Key", "isCorrect": false}, {"id": 40453, "text": "Esc Key", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 4: Create & Organize Class Folder Hierarchy Practice.",
                  pdfUrl: "/asset/4th class/Chapter-1/1/practical activities.docx",
                  fileName: "practical activities.pdf"
                }
              }
            }
          ]
        }
      ]
    },
    {
      gradeNumber: 5,
      gradeName: "Grade 5",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Chapter 1: Computer Skills & Hardware Devices",
          description: "Computer Fundamentals, Hardware Devices, Input/Output/Storage Devices, Computer Care & Ethics.",
          classes: [
            {
              id: 6,
              dayNumber: 1,
              title: "Class 1: Computer Fundamentals, Hardware Devices & Computer System",
              description: "Topics Covered: Introduction to Computers, Computer Fundamentals, Computer System, Hardware Devices, Internal Hardware, External Hardware, Functions of Hardware Devices, Input, Output and Storage Overview.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: null,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/5th class/chapter 1/class 1/TOPIC COVERED.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Computer System: Combination of hardware and software working together.", "Internal Hardware: CPU, Motherboard, RAM, Hard Disk drive.", "External Peripherals: Monitor, Keyboard, Mouse, Printer, Scanner."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
                  portalName: "GeeksforGeeks Educational Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which component is considered internal hardware inside the CPU cabinet?",
                  options: [{"id": 611, "text": "Motherboard & RAM", "isCorrect": true}, {"id": 612, "text": "External Desktop Speakers", "isCorrect": false}, {"id": 613, "text": "USB Flash Drive", "isCorrect": false}],
                  questions: [{"id": 61, "question": "1. Which component is considered internal hardware inside the CPU cabinet?", "options": [{"id": 611, "text": "Motherboard & RAM", "isCorrect": true}, {"id": 612, "text": "External Desktop Speakers", "isCorrect": false}, {"id": 613, "text": "USB Flash Drive", "isCorrect": false}]}, {"id": 62, "question": "2. What is the physical machinery and electronic parts of a computer called?", "options": [{"id": 621, "text": "Hardware", "isCorrect": true}, {"id": 622, "text": "Software", "isCorrect": false}, {"id": 623, "text": "Web Browser", "isCorrect": false}]}, {"id": 63, "question": "3. Which internal board connects the CPU, memory, and expansion slots?", "options": [{"id": 631, "text": "Motherboard", "isCorrect": true}, {"id": 632, "text": "Mouse Pad", "isCorrect": false}, {"id": 633, "text": "Screen Protector", "isCorrect": false}]}, {"id": 64, "question": "4. Which peripheral device is used to scan paper documents into digital images?", "options": [{"id": 641, "text": "Scanner", "isCorrect": true}, {"id": 642, "text": "Speaker", "isCorrect": false}, {"id": 643, "text": "Projector", "isCorrect": false}]}, {"id": 65, "question": "5. What combination forms a fully operational Computer System?", "options": [{"id": 651, "text": "Hardware + Software", "isCorrect": true}, {"id": 652, "text": "Monitor + Paper", "isCorrect": false}, {"id": 653, "text": "Cable + Plastic Box", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 1: Hardware Device Identification & Picture Matching Worksheet.",
                  pdfUrl: "/asset/5th class/chapter 1/class 1/practical activities.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 7,
              dayNumber: 2,
              title: "Class 2: Input, Output & Storage Devices in Daily Life",
              description: "Topics Covered: Input Devices, Output Devices, Storage Devices, Keyboard, Mouse, Scanner, Microphone, Webcam, Monitor, Printer, Speakers, Hard Disk, Pen Drive.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: 1,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/5th class/chapter 1/class 2/TOPIC COVERED.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Input Devices: Keyboard, Mouse, Scanner, Microphone, Webcam.", "Output Devices: Monitor, Printer, Speakers, Headphones, Projector.", "Storage Media: Hard Disk Drive, Solid State Drive, USB Flash Drive, SD Cards."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
                  portalName: "GeeksforGeeks Educational Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which device is primarily used to enter text into a computer?",
                  options: [{"id": 711, "text": "Keyboard", "isCorrect": true}, {"id": 712, "text": "Monitor", "isCorrect": false}, {"id": 713, "text": "Speakers", "isCorrect": false}],
                  questions: [{"id": 71, "question": "1. Which device is primarily used to enter text into a computer?", "options": [{"id": 711, "text": "Keyboard", "isCorrect": true}, {"id": 712, "text": "Monitor", "isCorrect": false}, {"id": 713, "text": "Speakers", "isCorrect": false}]}, {"id": 72, "question": "2. Which of the following is an Output device?", "options": [{"id": 721, "text": "Printer", "isCorrect": true}, {"id": 722, "text": "Webcam", "isCorrect": false}, {"id": 723, "text": "Microphone", "isCorrect": false}]}, {"id": 73, "question": "3. Which device records human voice and audio input?", "options": [{"id": 731, "text": "Microphone", "isCorrect": true}, {"id": 732, "text": "Hard Disk", "isCorrect": false}, {"id": 733, "text": "Mouse", "isCorrect": false}]}, {"id": 74, "question": "4. Which portable storage media plugs into a USB port?", "options": [{"id": 741, "text": "USB Flash Drive / Pen Drive", "isCorrect": true}, {"id": 742, "text": "RAM Chip", "isCorrect": false}, {"id": 743, "text": "CPU Fan", "isCorrect": false}]}, {"id": 75, "question": "5. Which device projects video onto a large classroom screen?", "options": [{"id": 751, "text": "Digital Projector", "isCorrect": true}, {"id": 752, "text": "Barcode Reader", "isCorrect": false}, {"id": 753, "text": "Trackball", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 2: Input, Output & Storage Device Sorting Worksheet.",
                  pdfUrl: "/asset/5th class/chapter 1/class 2/practical activities.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 8,
              dayNumber: 3,
              title: "Class 3: Computer Care, Digital Ethics & Responsible Technology Use",
              description: "Topics Covered: Maintenance, Virus Protection, Safe Browsing Habits, Digital Hygiene, Ergonomics, Screen Time Balance.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 2,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/5th class/chapter 1/class 1/TOPIC COVERED.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Antivirus software protects computer from malicious threats.", "Strong passwords protect online account security."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
                  portalName: "GeeksforGeeks Educational Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What software protects computers from malicious virus infections?",
                  options: [{"id": 811, "text": "Antivirus Software", "isCorrect": true}, {"id": 812, "text": "Calculator", "isCorrect": false}, {"id": 813, "text": "Media Player", "isCorrect": false}],
                  questions: [{"id": 81, "question": "1. What software protects computers from malicious virus infections?", "options": [{"id": 811, "text": "Antivirus Software", "isCorrect": true}, {"id": 812, "text": "Calculator", "isCorrect": false}, {"id": 813, "text": "Media Player", "isCorrect": false}]}, {"id": 82, "question": "2. What is a good practice for creating online account passwords?", "options": [{"id": 821, "text": "Use a mix of letters, numbers, and symbols", "isCorrect": true}, {"id": 822, "text": "Use 123456 for all accounts", "isCorrect": false}, {"id": 823, "text": "Share password with strangers", "isCorrect": false}]}, {"id": 83, "question": "3. What should you do if an unknown suspicious link pops up while browsing?", "options": [{"id": 831, "text": "Do not click and close the window", "isCorrect": true}, {"id": 832, "text": "Click it immediately", "isCorrect": false}, {"id": 833, "text": "Share it with everyone", "isCorrect": false}]}, {"id": 84, "question": "4. What term describes good posture and ergonomic desk setup?", "options": [{"id": 841, "text": "Computer Ergonomics", "isCorrect": true}, {"id": 842, "text": "Over-clocking", "isCorrect": false}, {"id": 843, "text": "Disk Format", "isCorrect": false}]}, {"id": 85, "question": "5. Why should computers be shut down properly from the Start menu?", "options": [{"id": 851, "text": "To safely close open files and prevent data corruption", "isCorrect": true}, {"id": 852, "text": "To make the monitor brighter", "isCorrect": false}, {"id": 853, "text": "To erase all homework", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 3: Digital Care & Ergonomics Safety Checklist Worksheet.",
                  pdfUrl: "/asset/5th class/chapter 1/class 1/practical activities.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 9,
              dayNumber: 4,
              title: "Class 4: Revision, Discussion & Assessment",
              description: "Topics Covered: Chapter 1 Summary, Practical Assessment Review, Oral Q&A, Final Quiz Evaluation.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 3,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/5th class/chapter 1/class 2/TOPIC COVERED.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Hardware and software work together as a system.", "Review core concepts for final mastery."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/",
                  portalName: "GeeksforGeeks Educational Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What stores long term files when the computer is turned off?",
                  options: [{"id": 911, "text": "Hard Disk Drive / SSD", "isCorrect": true}, {"id": 912, "text": "Mouse Pad", "isCorrect": false}, {"id": 913, "text": "RAM Cache", "isCorrect": false}],
                  questions: [{"id": 91, "question": "1. What stores long term files when the computer is turned off?", "options": [{"id": 911, "text": "Hard Disk Drive / SSD", "isCorrect": true}, {"id": 912, "text": "Mouse Pad", "isCorrect": false}, {"id": 913, "text": "RAM Cache", "isCorrect": false}]}, {"id": 92, "question": "2. Which device displays visual graphics and text output?", "options": [{"id": 921, "text": "Monitor Screen", "isCorrect": true}, {"id": 922, "text": "Keyboard", "isCorrect": false}, {"id": 923, "text": "Scanner", "isCorrect": false}]}, {"id": 93, "question": "3. What component processes all instructions and calculations?", "options": [{"id": 931, "text": "CPU (Processor)", "isCorrect": true}, {"id": 932, "text": "Power Cord", "isCorrect": false}, {"id": 933, "text": "Webcam Lens", "isCorrect": false}]}, {"id": 94, "question": "4. What device captures live video for video calls?", "options": [{"id": 941, "text": "Webcam", "isCorrect": true}, {"id": 942, "text": "Laser Printer", "isCorrect": false}, {"id": 943, "text": "Barcode Reader", "isCorrect": false}]}, {"id": 95, "question": "5. What device outputs sound effects and music?", "options": [{"id": 951, "text": "Speakers / Headphones", "isCorrect": true}, {"id": 952, "text": "Scanner", "isCorrect": false}, {"id": 953, "text": "Microphone", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 4: Chapter 1 Summary & Revision Assessment Worksheet.",
                  pdfUrl: "/asset/5th class/chapter 1/class 2/practical activities.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            }
          ]
        }
      ]
    },
    {
      gradeNumber: 6,
      gradeName: "Grade 6",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Chapter 1: Computer Fundamentals & Architecture",
          description: "CPU architecture, memory types (RAM/ROM), storage units, and motherboard buses.",
          classes: [
            {
              id: 601,
              dayNumber: 1,
              title: "Class 1: Primary Memory vs Secondary Memory",
              description: "RAM, ROM, Cache Memory, Hard Disk, SSD, and Memory Hierarchy.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: null,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/6th class/Chapter 1 Computer Fundamentals/Class VI â€“ Term I Digital Foundation.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["RAM is volatile working memory.", "ROM stores permanent boot instructions."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-memory/",
                  portalName: "GeeksforGeeks Memory Architecture Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which type of memory loses its content when power is switched off?",
                  options: [{"id": 60111, "text": "RAM (Random Access Memory)", "isCorrect": true}, {"id": 60112, "text": "ROM (Read Only Memory)", "isCorrect": false}, {"id": 60113, "text": "Hard Disk Drive", "isCorrect": false}],
                  questions: [{"id": 6011, "question": "1. Which type of memory loses its content when power is switched off?", "options": [{"id": 60111, "text": "RAM (Random Access Memory)", "isCorrect": true}, {"id": 60112, "text": "ROM (Read Only Memory)", "isCorrect": false}, {"id": 60113, "text": "Hard Disk Drive", "isCorrect": false}]}, {"id": 6012, "question": "2. What type of memory stores permanent BIOS boot instructions?", "options": [{"id": 60121, "text": "ROM (Read Only Memory)", "isCorrect": true}, {"id": 60122, "text": "RAM", "isCorrect": false}, {"id": 60123, "text": "Virtual Memory", "isCorrect": false}]}, {"id": 6013, "question": "3. What is high-speed memory located directly between CPU and RAM called?", "options": [{"id": 60131, "text": "Cache Memory", "isCorrect": true}, {"id": 60132, "text": "DVD ROM", "isCorrect": false}, {"id": 60133, "text": "SD Card", "isCorrect": false}]}, {"id": 6014, "question": "4. Which storage device stores operating system files permanently?", "options": [{"id": 60141, "text": "Hard Disk / SSD", "isCorrect": true}, {"id": 60142, "text": "System RAM", "isCorrect": false}, {"id": 60143, "text": "CPU Registers", "isCorrect": false}]}, {"id": 6015, "question": "5. What term describes memory that requires continuous power to hold data?", "options": [{"id": 60151, "text": "Volatile Memory", "isCorrect": true}, {"id": 60152, "text": "Non-Volatile Memory", "isCorrect": false}, {"id": 60153, "text": "Optical Memory", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 1: Memory Classification & RAM vs ROM Comparison Table.",
                  pdfUrl: "/asset/6th class/Chapter 1 Computer Fundamentals/Class VI â€“ Term I Digital Foundation.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 602,
              dayNumber: 2,
              title: "Class 2: CPU Architecture & Control Unit Functions",
              description: "ALU, Control Unit, Registers, Instruction Execution Cycle (Fetch-Decode-Execute).",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: 1,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/6th class/Chapter 1 Computer Fundamentals/Class VI â€“ Term I Digital Foundation.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["ALU performs arithmetic and logic calculations.", "Control unit directs instruction flow."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-memory/",
                  portalName: "GeeksforGeeks Memory Architecture Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which CPU component performs addition, subtraction, and logical comparisons?",
                  options: [{"id": 60211, "text": "ALU (Arithmetic Logic Unit)", "isCorrect": true}, {"id": 60212, "text": "Hard Disk Controller", "isCorrect": false}, {"id": 60213, "text": "RAM Module", "isCorrect": false}],
                  questions: [{"id": 6021, "question": "1. Which CPU component performs addition, subtraction, and logical comparisons?", "options": [{"id": 60211, "text": "ALU (Arithmetic Logic Unit)", "isCorrect": true}, {"id": 60212, "text": "Hard Disk Controller", "isCorrect": false}, {"id": 60213, "text": "RAM Module", "isCorrect": false}]}, {"id": 6022, "question": "2. What cycle represents the continuous execution sequence inside CPU?", "options": [{"id": 60221, "text": "Fetch -> Decode -> Execute Cycle", "isCorrect": true}, {"id": 60222, "text": "Input -> Output -> Delete", "isCorrect": false}, {"id": 60223, "text": "Boot -> Print -> Shutdown", "isCorrect": false}]}, {"id": 6023, "question": "3. What ultra-fast temporary storage locations exist inside CPU processor core?", "options": [{"id": 60231, "text": "CPU Registers", "isCorrect": true}, {"id": 60232, "text": "USB Flash Drives", "isCorrect": false}, {"id": 60233, "text": "Optical Disks", "isCorrect": false}]}, {"id": 6024, "question": "4. Which unit coordinates signals between memory, ALU, and I/O devices?", "options": [{"id": 60241, "text": "Control Unit (CU)", "isCorrect": true}, {"id": 60242, "text": "Display Adapter", "isCorrect": false}, {"id": 60243, "text": "Network Interface", "isCorrect": false}]}, {"id": 6025, "question": "5. What unit measures processor speed in billions of cycles per second?", "options": [{"id": 60251, "text": "Gigahertz (GHz)", "isCorrect": true}, {"id": 60252, "text": "Kilobytes (KB)", "isCorrect": false}, {"id": 60253, "text": "Pixels (px)", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 2: CPU Architecture Diagram & Fetch-Decode-Execute Flowchart.",
                  pdfUrl: "/asset/6th class/Chapter 1 Computer Fundamentals/Class VI â€“ Term I Digital Foundation.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 603,
              dayNumber: 3,
              title: "Class 3: Input/Output Device Interfacing & Ports",
              description: "USB ports, HDMI, Ethernet RJ45, Audio jacks, Bluetooth, and Wireless interfaces.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 2,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/6th class/Chapter 1 Computer Fundamentals/Class VI â€“ Term I Digital Foundation.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Ports connect external devices to motherboard.", "USB is standard universal serial bus."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-memory/",
                  portalName: "GeeksforGeeks Memory Architecture Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What universal connector standard plugs keyboards, mice, and flash drives?",
                  options: [{"id": 60311, "text": "USB (Universal Serial Bus)", "isCorrect": true}, {"id": 60312, "text": "VGA Port", "isCorrect": false}, {"id": 60313, "text": "Power Plug", "isCorrect": false}],
                  questions: [{"id": 6031, "question": "1. What universal connector standard plugs keyboards, mice, and flash drives?", "options": [{"id": 60311, "text": "USB (Universal Serial Bus)", "isCorrect": true}, {"id": 60312, "text": "VGA Port", "isCorrect": false}, {"id": 60313, "text": "Power Plug", "isCorrect": false}]}, {"id": 6032, "question": "2. Which high-definition port carries both digital video and audio to monitors/TVs?", "options": [{"id": 60321, "text": "HDMI Port", "isCorrect": true}, {"id": 60322, "text": "PS/2 Port", "isCorrect": false}, {"id": 60323, "text": "Serial DB9", "isCorrect": false}]}, {"id": 6033, "question": "3. Which network port connects wired Ethernet LAN cables to a computer?", "options": [{"id": 60331, "text": "RJ45 Ethernet Port", "isCorrect": true}, {"id": 60332, "text": "Audio Line-In", "isCorrect": false}, {"id": 60333, "text": "USB Type C", "isCorrect": false}]}, {"id": 6034, "question": "4. What short-range wireless technology connects wireless mice and headphones?", "options": [{"id": 60341, "text": "Bluetooth", "isCorrect": true}, {"id": 60342, "text": "SATA Cable", "isCorrect": false}, {"id": 60343, "text": "HDMI Cable", "isCorrect": false}]}, {"id": 6035, "question": "5. What device driver software is needed when plugging in a new printer?", "options": [{"id": 60351, "text": "Hardware Device Driver", "isCorrect": true}, {"id": 60352, "text": "Web Browser Extension", "isCorrect": false}, {"id": 60353, "text": "Text Editor", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 3: Computer Ports & Connectors Matching Worksheet.",
                  pdfUrl: "/asset/6th class/Chapter 1 Computer Fundamentals/Class VI â€“ Term I Digital Foundation.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 604,
              dayNumber: 4,
              title: "Class 4: Chapter 1 Review & Quiz Challenge",
              description: "Chapter summary, architecture review, storage calculation problems, and self-assessment.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 3,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/6th class/Chapter 1 Computer Fundamentals/Class VI â€“ Term I Digital Foundation.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["8 bits equal 1 byte.", "1024 Kilobytes equal 1 Megabyte."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-memory/",
                  portalName: "GeeksforGeeks Memory Architecture Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. How many bits make up 1 Byte of data?",
                  options: [{"id": 60411, "text": "8 Bits", "isCorrect": true}, {"id": 60412, "text": "4 Bits", "isCorrect": false}, {"id": 60413, "text": "16 Bits", "isCorrect": false}],
                  questions: [{"id": 6041, "question": "1. How many bits make up 1 Byte of data?", "options": [{"id": 60411, "text": "8 Bits", "isCorrect": true}, {"id": 60412, "text": "4 Bits", "isCorrect": false}, {"id": 60413, "text": "16 Bits", "isCorrect": false}]}, {"id": 6042, "question": "2. How many Kilobytes (KB) equal 1 Megabyte (MB)?", "options": [{"id": 60421, "text": "1024 KB", "isCorrect": true}, {"id": 60422, "text": "100 KB", "isCorrect": false}, {"id": 60423, "text": "500 KB", "isCorrect": false}]}, {"id": 6043, "question": "3. Which storage capacity unit comes directly after Gigabyte (GB)?", "options": [{"id": 60431, "text": "Terabyte (TB)", "isCorrect": true}, {"id": 60432, "text": "Kilobyte (KB)", "isCorrect": false}, {"id": 60433, "text": "Bit", "isCorrect": false}]}, {"id": 6044, "question": "4. What optical disk format holds up to 4.7 GB of data?", "options": [{"id": 60441, "text": "DVD ROM", "isCorrect": true}, {"id": 60442, "text": "Floppy Disk", "isCorrect": false}, {"id": 60443, "text": "CD ROM", "isCorrect": false}]}, {"id": 6045, "question": "5. What non-volatile storage media uses flash memory chips with no moving parts?", "options": [{"id": 60451, "text": "SSD (Solid State Drive)", "isCorrect": true}, {"id": 60452, "text": "Hard Disk Drive (HDD)", "isCorrect": false}, {"id": 60453, "text": "Magnetic Tape", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 4: Data Storage Unit Conversions & Revision Challenge.",
                  pdfUrl: "/asset/6th class/Chapter 1 Computer Fundamentals/Class VI â€“ Term I Digital Foundation.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            }
          ]
        }
      ]
    },
    {
      gradeNumber: 7,
      gradeName: "Grade 7",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Chapter 1: Computer Fundamentals & Peripherals",
          description: "Computer Architecture, System Unit, Internal Component Functions, Input/Output Media.",
          classes: [
            {
              id: 701,
              dayNumber: 1,
              title: "Class 1: Computer Architecture & Motherboard Components",
              description: "Processor sockets, RAM slots, expansion cards, power supply, and system buses.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: null,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/7th class/Class VII â€“ Term I Future Skills.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Motherboard acts as the central printed circuit board.", "Buses transport data between CPU and memory."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-organization-and-architecture-tutorials/",
                  portalName: "GeeksforGeeks Architecture Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which main circuit board connects all internal computer hardware?",
                  options: [{"id": 70111, "text": "Motherboard", "isCorrect": true}, {"id": 70112, "text": "Hard Disk Drive", "isCorrect": false}, {"id": 70113, "text": "Monitor Panel", "isCorrect": false}],
                  questions: [{"id": 7011, "question": "1. Which main circuit board connects all internal computer hardware?", "options": [{"id": 70111, "text": "Motherboard", "isCorrect": true}, {"id": 70112, "text": "Hard Disk Drive", "isCorrect": false}, {"id": 70113, "text": "Monitor Panel", "isCorrect": false}]}, {"id": 7012, "question": "2. What electrical channels transmit data signals across motherboard components?", "options": [{"id": 70121, "text": "System Buses", "isCorrect": true}, {"id": 70122, "text": "USB Drivers", "isCorrect": false}, {"id": 70123, "text": "Power Cords", "isCorrect": false}]}, {"id": 7013, "question": "3. Which unit converts AC wall electricity into regulated DC power for components?", "options": [{"id": 70131, "text": "Power Supply Unit (PSU)", "isCorrect": true}, {"id": 70132, "text": "RAM Module", "isCorrect": false}, {"id": 70133, "text": "Sound Card", "isCorrect": false}]}, {"id": 7014, "question": "4. Where is the CPU chip mounted on the motherboard?", "options": [{"id": 70141, "text": "CPU Socket", "isCorrect": true}, {"id": 70142, "text": "SATA Port", "isCorrect": false}, {"id": 70143, "text": "PCI Express Slot", "isCorrect": false}]}, {"id": 7015, "question": "5. What slots are used to plug in graphics cards and sound cards?", "options": [{"id": 70151, "text": "Expansion Slots (PCIe)", "isCorrect": true}, {"id": 70152, "text": "HDMI Output", "isCorrect": false}, {"id": 70153, "text": "Audio Jack", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 1: Motherboard Component Labeling & Function Matching Worksheet.",
                  pdfUrl: "/asset/7th class/Class VII â€“ Term I Future Skills.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 702,
              dayNumber: 2,
              title: "Class 2: Secondary Storage Devices & Optical/Solid State Media",
              description: "HDD, SSD, NVMe, USB Flash drives, Memory cards, and cloud storage backup.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: 1,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/7th class/Class VII â€“ Term I Future Skills.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["SSD utilizes flash memory chips for high-speed read/write.", "Cloud storage enables remote data backup."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-organization-and-architecture-tutorials/",
                  portalName: "GeeksforGeeks Architecture Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which storage technology has no mechanical spinning platters?",
                  options: [{"id": 70211, "text": "Solid State Drive (SSD / NVMe)", "isCorrect": true}, {"id": 70212, "text": "Hard Disk Drive (HDD)", "isCorrect": false}, {"id": 70213, "text": "CD ROM Drive", "isCorrect": false}],
                  questions: [{"id": 7021, "question": "1. Which storage technology has no mechanical spinning platters?", "options": [{"id": 70211, "text": "Solid State Drive (SSD / NVMe)", "isCorrect": true}, {"id": 70212, "text": "Hard Disk Drive (HDD)", "isCorrect": false}, {"id": 70213, "text": "CD ROM Drive", "isCorrect": false}]}, {"id": 7022, "question": "2. What storage service saves files securely over internet remote servers?", "options": [{"id": 70221, "text": "Cloud Storage (Google Drive / OneDrive)", "isCorrect": true}, {"id": 70222, "text": "RAM Cache", "isCorrect": false}, {"id": 70223, "text": "Local Floppy Disk", "isCorrect": false}]}, {"id": 7023, "question": "3. What optical storage disk uses blue laser technology for 25GB+ data capacity?", "options": [{"id": 70231, "text": "Blu-ray Disc", "isCorrect": true}, {"id": 70232, "text": "Standard CD", "isCorrect": false}, {"id": 70233, "text": "Magnetic Tape", "isCorrect": false}]}, {"id": 7024, "question": "4. What small flash memory cards are used inside smartphones and cameras?", "options": [{"id": 70241, "text": "MicroSD Memory Card", "isCorrect": true}, {"id": 70242, "text": "SIM Card", "isCorrect": false}, {"id": 70243, "text": "Graphics Card", "isCorrect": false}]}, {"id": 7025, "question": "5. What data interface connects modern internal SATA drives to motherboards?", "options": [{"id": 70251, "text": "SATA Data Cable", "isCorrect": true}, {"id": 70252, "text": "VGA Cable", "isCorrect": false}, {"id": 70253, "text": "Audio Wire", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 2: Storage Media Comparison Table & Speed Calculations.",
                  pdfUrl: "/asset/7th class/Class VII â€“ Term I Future Skills.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 703,
              dayNumber: 3,
              title: "Class 3: Advanced Input/Output Peripherals & Sensors",
              description: "Barcode scanners, biometric fingerprint readers, 3D printers, VR headsets, and touch sensors.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 2,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/7th class/Class VII â€“ Term I Future Skills.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Biometric sensors scan physical features for authentication.", "3D printers construct physical objects layer by layer."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-organization-and-architecture-tutorials/",
                  portalName: "GeeksforGeeks Architecture Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What input device reads black and white printed product codes in supermarkets?",
                  options: [{"id": 70311, "text": "Barcode Reader", "isCorrect": true}, {"id": 70312, "text": "Plotter Printer", "isCorrect": false}, {"id": 70313, "text": "Stylus Pen", "isCorrect": false}],
                  questions: [{"id": 7031, "question": "1. What input device reads black and white printed product codes in supermarkets?", "options": [{"id": 70311, "text": "Barcode Reader", "isCorrect": true}, {"id": 70312, "text": "Plotter Printer", "isCorrect": false}, {"id": 70313, "text": "Stylus Pen", "isCorrect": false}]}, {"id": 7032, "question": "2. What security device scans fingerprints or facial features for user login?", "options": [{"id": 70321, "text": "Biometric Sensor", "isCorrect": true}, {"id": 70322, "text": "Optical Mouse", "isCorrect": false}, {"id": 70323, "text": "Webcam Lens", "isCorrect": false}]}, {"id": 7033, "question": "3. What output device builds solid 3-dimensional physical plastic models layer by layer?", "options": [{"id": 70331, "text": "3D Printer", "isCorrect": true}, {"id": 70332, "text": "Dot Matrix Printer", "isCorrect": false}, {"id": 70333, "text": "Inkjet Printer", "isCorrect": false}]}, {"id": 7034, "question": "4. What display headset immerses users into 360-degree virtual reality simulations?", "options": [{"id": 70341, "text": "VR Headset", "isCorrect": true}, {"id": 70342, "text": "CRT Monitor", "isCorrect": false}, {"id": 70343, "text": "Projector Screen", "isCorrect": false}]}, {"id": 7035, "question": "5. What specialized large printer draws high-precision engineering blueprints?", "options": [{"id": 70351, "text": "Plotter", "isCorrect": true}, {"id": 70352, "text": "Thermal Printer", "isCorrect": false}, {"id": 70353, "text": "Scanner", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 3: Advanced Peripherals & Biometric Security Devices Assignment.",
                  pdfUrl: "/asset/7th class/Class VII â€“ Term I Future Skills.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 704,
              dayNumber: 4,
              title: "Class 4: Chapter 1 Review & Architecture Quiz",
              description: "Comprehensive review of system architecture, hardware peripherals, and self-assessment quiz.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 3,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/7th class/Class VII â€“ Term I Future Skills.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Architecture unites input, output, CPU, and storage.", "Chapter 1 review and self-evaluation."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/computer-organization-and-architecture-tutorials/",
                  portalName: "GeeksforGeeks Architecture Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What component maintains system clock time when the PC is unplugged?",
                  options: [{"id": 70411, "text": "CMOS Battery", "isCorrect": true}, {"id": 70412, "text": "CPU Fan", "isCorrect": false}, {"id": 70413, "text": "Power Cord", "isCorrect": false}],
                  questions: [{"id": 7041, "question": "1. What component maintains system clock time when the PC is unplugged?", "options": [{"id": 70411, "text": "CMOS Battery", "isCorrect": true}, {"id": 70412, "text": "CPU Fan", "isCorrect": false}, {"id": 70413, "text": "Power Cord", "isCorrect": false}]}, {"id": 7042, "question": "2. What cooling component absorbs heat directly from the CPU processor surface?", "options": [{"id": 70421, "text": "Heat Sink & Cooling Fan", "isCorrect": true}, {"id": 70422, "text": "Dust Cover", "isCorrect": false}, {"id": 70423, "text": "Graphics Card", "isCorrect": false}]}, {"id": 7043, "question": "3. What dedicated expansion card processes complex 3D graphics for video games?", "options": [{"id": 70431, "text": "GPU / Graphics Card", "isCorrect": true}, {"id": 70432, "text": "Network Interface Card", "isCorrect": false}, {"id": 70433, "text": "Sound Card", "isCorrect": false}]}, {"id": 7044, "question": "4. What non-volatile ROM chip performs initial POST diagnostic checks on startup?", "options": [{"id": 70441, "text": "BIOS Chip", "isCorrect": true}, {"id": 70442, "text": "Hard Disk Partition", "isCorrect": false}, {"id": 70443, "text": "Audio Jack", "isCorrect": false}]}, {"id": 7045, "question": "5. What system bus transports data between CPU, RAM, and storage devices?", "options": [{"id": 70451, "text": "Data Bus", "isCorrect": true}, {"id": 70452, "text": "Control Switch", "isCorrect": false}, {"id": 70453, "text": "Power Wire", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 4: Chapter 1 System Architecture Summary & Review Test.",
                  pdfUrl: "/asset/7th class/Class VII â€“ Term I Future Skills.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            }
          ]
        }
      ]
    },
    {
      gradeNumber: 8,
      gradeName: "Grade 8",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Chapter 1: Canva Basics & Visual Media Creation",
          description: "Graphic design principles, templates, posters, banners, and color theory.",
          classes: [
            {
              id: 801,
              dayNumber: 1,
              title: "Class 1: Introduction to Canva & Design Workspace",
              description: "Canvas setup, element placement, typography, and poster design.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: null,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Visual hierarchy guides viewer attention.", "Color harmony creates attractive designs."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.canva.com/design/",
                  portalName: "Canva Graphic Design Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which tool in Canva is used to add headings and body text?",
                  options: [{"id": 80111, "text": "Text Tool Sidebar", "isCorrect": true}, {"id": 80112, "text": "Background Canvas Filler", "isCorrect": false}, {"id": 80113, "text": "Crop Tool", "isCorrect": false}],
                  questions: [{"id": 8011, "question": "1. Which tool in Canva is used to add headings and body text?", "options": [{"id": 80111, "text": "Text Tool Sidebar", "isCorrect": true}, {"id": 80112, "text": "Background Canvas Filler", "isCorrect": false}, {"id": 80113, "text": "Crop Tool", "isCorrect": false}]}, {"id": 8012, "question": "2. What design principle arranges elements to guide the viewer's eye first?", "options": [{"id": 80121, "text": "Visual Hierarchy", "isCorrect": true}, {"id": 80122, "text": "Random Scattering", "isCorrect": false}, {"id": 80123, "text": "Monochrome Blur", "isCorrect": false}]}, {"id": 8013, "question": "3. What container element in Canva masks photos into custom geometric shapes?", "options": [{"id": 80131, "text": "Frames", "isCorrect": true}, {"id": 80132, "text": "Rulers", "isCorrect": false}, {"id": 80133, "text": "Color Swatches", "isCorrect": false}]}, {"id": 8014, "question": "4. Which export option is best for downloading high resolution printable posters?", "options": [{"id": 80141, "text": "PDF Print", "isCorrect": true}, {"id": 80142, "text": "Low Quality GIF", "isCorrect": false}, {"id": 80143, "text": "Plain Text File", "isCorrect": false}]}, {"id": 8015, "question": "5. What feature snaps canvas elements evenly to align borders and titles?", "options": [{"id": 80151, "text": "Smart Guides & Alignment Grids", "isCorrect": true}, {"id": 80152, "text": "Blur Tool", "isCorrect": false}, {"id": 80153, "text": "Color Picker", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 1: Design an Educational Event Poster in Canva.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 802,
              dayNumber: 2,
              title: "Class 2: Design Elements, Shapes & Icon Placement",
              description: "Utilizing lines, geometric shapes, vectors, icons, and illustrations in graphic compositions.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: 1,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Shapes create structure and visual balance.", "Icons simplify complex concepts."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.canva.com/design/",
                  portalName: "Canva Graphic Design Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What Canva tab contains free vector icons, graphics, and lines?",
                  options: [{"id": 80211, "text": "Elements Tab", "isCorrect": true}, {"id": 80212, "text": "Projects Folder", "isCorrect": false}, {"id": 80213, "text": "Brand Kit", "isCorrect": false}],
                  questions: [{"id": 8021, "question": "1. What Canva tab contains free vector icons, graphics, and lines?", "options": [{"id": 80211, "text": "Elements Tab", "isCorrect": true}, {"id": 80212, "text": "Projects Folder", "isCorrect": false}, {"id": 80213, "text": "Brand Kit", "isCorrect": false}]}, {"id": 8022, "question": "2. How do you maintain proportional scaling of an image while resizing?", "options": [{"id": 80221, "text": "Drag corner handles while holding Shift", "isCorrect": true}, {"id": 80222, "text": "Squish middle handles", "isCorrect": false}, {"id": 80223, "text": "Rotate 360 degrees", "isCorrect": false}]}, {"id": 8023, "question": "3. What option sends a shape behind text elements on canvas?", "options": [{"id": 80231, "text": "Position -> Send to Back", "isCorrect": true}, {"id": 80232, "text": "Transparency -> 0%", "isCorrect": false}, {"id": 80233, "text": "Lock Element", "isCorrect": false}]}, {"id": 8024, "question": "4. What setting softens graphic background intensity by adjusting opacity?", "options": [{"id": 80241, "text": "Transparency Tool", "isCorrect": true}, {"id": 80242, "text": "Crop Tool", "isCorrect": false}, {"id": 80243, "text": "Font Style", "isCorrect": false}]}, {"id": 8025, "question": "5. What feature locks finished elements so they don't move while editing?", "options": [{"id": 80251, "text": "Lock Button (Padlock Icon)", "isCorrect": true}, {"id": 80252, "text": "Group Button", "isCorrect": false}, {"id": 80253, "text": "Duplicate Button", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 2: Create a Geometric Infographic Banner Worksheet.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 803,
              dayNumber: 3,
              title: "Class 3: Typography & Font Pairing Techniques",
              description: "Font families, serif vs sans-serif, kerning, line spacing, and font pairing rules.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 2,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Sans-serif fonts are clean for digital displays.", "Limit designs to 2-3 matching font families."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.canva.com/design/",
                  portalName: "Canva Graphic Design Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. Which font style lacks decorative strokes at letter ends and looks modern?",
                  options: [{"id": 80311, "text": "Sans-Serif (e.g. Montserrat / Inter)", "isCorrect": true}, {"id": 80312, "text": "Decorative Script", "isCorrect": false}, {"id": 80313, "text": "Gothic Blackletter", "isCorrect": false}],
                  questions: [{"id": 8031, "question": "1. Which font style lacks decorative strokes at letter ends and looks modern?", "options": [{"id": 80311, "text": "Sans-Serif (e.g. Montserrat / Inter)", "isCorrect": true}, {"id": 80312, "text": "Decorative Script", "isCorrect": false}, {"id": 80313, "text": "Gothic Blackletter", "isCorrect": false}]}, {"id": 8032, "question": "2. How many distinct font families should ideally be used in a single poster?", "options": [{"id": 80321, "text": "Maximum 2 to 3 Fonts", "isCorrect": true}, {"id": 80322, "text": "At least 15 Fonts", "isCorrect": false}, {"id": 80323, "text": "Use a new font per letter", "isCorrect": false}]}, {"id": 8033, "question": "3. What parameter adjusts vertical spacing between lines of text?", "options": [{"id": 80331, "text": "Line Spacing / Leading", "isCorrect": true}, {"id": 80332, "text": "Letter Kerning", "isCorrect": false}, {"id": 80333, "text": "Font Size", "isCorrect": false}]}, {"id": 8034, "question": "4. What parameter adjusts horizontal space between individual text letters?", "options": [{"id": 80341, "text": "Letter Spacing / Tracking", "isCorrect": true}, {"id": 80342, "text": "Text Alignment", "isCorrect": false}, {"id": 80343, "text": "Bullet List", "isCorrect": false}]}, {"id": 8035, "question": "5. What contrast rule ensures text is easily readable over dark photo backgrounds?", "options": [{"id": 80351, "text": "Use light white text with background overlay shadow", "isCorrect": true}, {"id": 80352, "text": "Use dark black text on dark background", "isCorrect": false}, {"id": 80353, "text": "Make text transparent", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 3: Typography Poster & Font Pairing Design Exercise.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 804,
              dayNumber: 4,
              title: "Class 4: Color Palettes & Contrast Rules",
              description: "Color wheel, primary/secondary colors, complementary palettes, and emotional impact.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 3,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Complementary colors create high-contrast call-outs.", "Color wheel guides harmonious palette selection."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.canva.com/design/",
                  portalName: "Canva Graphic Design Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What are colors opposite each other on the color wheel called?",
                  options: [{"id": 80411, "text": "Complementary Colors", "isCorrect": true}, {"id": 80412, "text": "Monochrome Shades", "isCorrect": false}, {"id": 80413, "text": "Grayscale Tones", "isCorrect": false}],
                  questions: [{"id": 8041, "question": "1. What are colors opposite each other on the color wheel called?", "options": [{"id": 80411, "text": "Complementary Colors", "isCorrect": true}, {"id": 80412, "text": "Monochrome Shades", "isCorrect": false}, {"id": 80413, "text": "Grayscale Tones", "isCorrect": false}]}, {"id": 8042, "question": "2. Which color hex code represents pure crisp white?", "options": [{"id": 80421, "text": "#FFFFFF", "isCorrect": true}, {"id": 80422, "text": "#000000", "isCorrect": false}, {"id": 80423, "text": "#FF0000", "isCorrect": false}]}, {"id": 8043, "question": "3. What tool in Canva extracts color codes directly from uploaded photos?", "options": [{"id": 80431, "text": "Color Eyedropper Tool", "isCorrect": true}, {"id": 80432, "text": "Eraser Tool", "isCorrect": false}, {"id": 80433, "text": "Magic Wand", "isCorrect": false}]}, {"id": 8044, "question": "4. What color scheme uses different shades and tints of a single hue?", "options": [{"id": 80441, "text": "Monochromatic Palette", "isCorrect": true}, {"id": 80442, "text": "Rainbow Triad", "isCorrect": false}, {"id": 80443, "text": "Neon Contrast", "isCorrect": false}]}, {"id": 8045, "question": "5. Why is high contrast ratio between text and background important?", "options": [{"id": 80451, "text": "Improves legibility and accessibility for all viewers", "isCorrect": true}, {"id": 80452, "text": "Decreases file size", "isCorrect": false}, {"id": 80453, "text": "Speeds up printing", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 4: Create Brand Color Palette & Contrast Test Assignment.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 805,
              dayNumber: 5,
              title: "Class 5: Designing Digital Certificates & Badges",
              description: "Borders, crests, signature lines, alignment grids, and certificate export.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 4,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Certificates require formal symmetrical balance.", "High-resolution PDF print export ensures quality."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.canva.com/design/",
                  portalName: "Canva Graphic Design Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What layout alignment is standard for formal achievement certificates?",
                  options: [{"id": 80511, "text": "Center Alignment", "isCorrect": true}, {"id": 80512, "text": "Staggered Right", "isCorrect": false}, {"id": 80513, "text": "Bottom Left", "isCorrect": false}],
                  questions: [{"id": 8051, "question": "1. What layout alignment is standard for formal achievement certificates?", "options": [{"id": 80511, "text": "Center Alignment", "isCorrect": true}, {"id": 80512, "text": "Staggered Right", "isCorrect": false}, {"id": 80513, "text": "Bottom Left", "isCorrect": false}]}, {"id": 8052, "question": "2. What graphical element frames the outer border of a digital certificate?", "options": [{"id": 80521, "text": "Ornamental Border Frame", "isCorrect": true}, {"id": 80522, "text": "Speech Bubble", "isCorrect": false}, {"id": 80523, "text": "Chart Grid", "isCorrect": false}]}, {"id": 8053, "question": "3. What line element is added at the bottom for authorized sign-off?", "options": [{"id": 80531, "text": "Signature Line & Designation Title", "isCorrect": true}, {"id": 80532, "text": "Hyperlink URL", "isCorrect": false}, {"id": 80533, "text": "Page Number", "isCorrect": false}]}, {"id": 8054, "question": "4. What graphic seal image adds official credibility to award certificates?", "options": [{"id": 80541, "text": "Golden Ribbon Badge / Crest", "isCorrect": true}, {"id": 80542, "text": "Watermelon Sticker", "isCorrect": false}, {"id": 80543, "text": "Arrow Pointer", "isCorrect": false}]}, {"id": 8055, "question": "5. What file type is recommended when exporting certificates for high quality printing?", "options": [{"id": 80551, "text": "PDF Print (300 DPI)", "isCorrect": true}, {"id": 80552, "text": "Animated GIF", "isCorrect": false}, {"id": 80553, "text": "Low Res JPG", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 5: Design a Student Achievement Award Certificate in Canva.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 806,
              dayNumber: 6,
              title: "Class 6: Chapter 1 Design Project Presentation",
              description: "Presenting Canva graphic portfolio, peer review, design evaluation, and export.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 5,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Design presentation highlights choices.", "Peer review improves composition skills."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.canva.com/design/",
                  portalName: "Canva Graphic Design Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What share link setting allows teammates to view design without editing?",
                  options: [{"id": 80611, "text": "View Only Link", "isCorrect": true}, {"id": 80612, "text": "Edit Permission Link", "isCorrect": false}, {"id": 80613, "text": "Delete Project", "isCorrect": false}],
                  questions: [{"id": 8061, "question": "1. What share link setting allows teammates to view design without editing?", "options": [{"id": 80611, "text": "View Only Link", "isCorrect": true}, {"id": 80612, "text": "Edit Permission Link", "isCorrect": false}, {"id": 80613, "text": "Delete Project", "isCorrect": false}]}, {"id": 8062, "question": "2. What feature presents Canva slides directly in full-screen presentation mode?", "options": [{"id": 80621, "text": "Present Mode (Shortcut Ctrl + Alt + P)", "isCorrect": true}, {"id": 80622, "text": "Grid View", "isCorrect": false}, {"id": 80623, "text": "Download Zip", "isCorrect": false}]}, {"id": 8063, "question": "3. What feedback method evaluates layout contrast, alignment, and message clarity?", "options": [{"id": 80631, "text": "Design Peer Review Rubric", "isCorrect": true}, {"id": 80632, "text": "Random Coin Flip", "isCorrect": false}, {"id": 80633, "text": "Spell Check Only", "isCorrect": false}]}, {"id": 8064, "question": "4. What format preserves vector quality when exporting logos for web transparent backgrounds?", "options": [{"id": 80641, "text": "PNG with Transparent Background", "isCorrect": true}, {"id": 80642, "text": "BMP Image", "isCorrect": false}, {"id": 80643, "text": "TXT Document", "isCorrect": false}]}, {"id": 8065, "question": "5. What folder stores all created Canva graphics for easy management?", "options": [{"id": 80651, "text": "Canva Projects / Folders", "isCorrect": true}, {"id": 80652, "text": "Recycle Bin", "isCorrect": false}, {"id": 80653, "text": "Trash Can", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 6: Chapter 1 Portfolio Presentation & Final Design Assessment.",
                  pdfUrl: "/asset/8th class/Chapter 1 Canva Basics/Class VIII â€“ Graphic Design & Digital Creativity.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            }
          ]
        }
      ]
    },
    {
      gradeNumber: 9,
      gradeName: "Grade 9",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Chapter 1: Information Technology & Systems Architecture",
          description: "Data processing lifecycle, OS management, network fundamentals & file systems.",
          classes: [
            {
              id: 901,
              dayNumber: 1,
              title: "Class 1: Data Processing Cycle & Computer System Architecture",
              description: "Input, Processing, Storage, Output cycle and data representations.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: null,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Data processing converts raw facts into meaningful information.", "CPU coordinates ALU and Control Unit."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/data-processing-cycle/",
                  portalName: "GeeksforGeeks Systems Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What are the four core stages of the data processing cycle?",
                  options: [{"id": 90111, "text": "Input, Processing, Storage, Output", "isCorrect": true}, {"id": 90112, "text": "Download, Upload, Edit, Delete", "isCorrect": false}, {"id": 90113, "text": "Compile, Debug, Run, Print", "isCorrect": false}],
                  questions: [{"id": 9011, "question": "1. What are the four core stages of the data processing cycle?", "options": [{"id": 90111, "text": "Input, Processing, Storage, Output", "isCorrect": true}, {"id": 90112, "text": "Download, Upload, Edit, Delete", "isCorrect": false}, {"id": 90113, "text": "Compile, Debug, Run, Print", "isCorrect": false}]}, {"id": 9012, "question": "2. Which component controls the execution of instructions inside the CPU?", "options": [{"id": 90121, "text": "Control Unit (CU)", "isCorrect": true}, {"id": 90122, "text": "Hard Disk Controller", "isCorrect": false}, {"id": 90123, "text": "Network Interface Card", "isCorrect": false}]}, {"id": 9013, "question": "3. What type of data representation uses binary 0s and 1s inside digital systems?", "options": [{"id": 90131, "text": "Machine Code / Binary Representation", "isCorrect": true}, {"id": 90132, "text": "Decimal Fractional Format", "isCorrect": false}, {"id": 90133, "text": "Roman Numerals", "isCorrect": false}]}, {"id": 9014, "question": "4. What is unprocessed raw facts and numbers called before computation?", "options": [{"id": 90141, "text": "Raw Data", "isCorrect": true}, {"id": 90142, "text": "Executive Summary", "isCorrect": false}, {"id": 90143, "text": "Final Insight", "isCorrect": false}]}, {"id": 9015, "question": "5. Which bus carries memory addresses from the processor to system RAM?", "options": [{"id": 90151, "text": "Address Bus", "isCorrect": true}, {"id": 90152, "text": "Power Bus", "isCorrect": false}, {"id": 90153, "text": "Serial Port", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 1: Data Processing Cycle Flow Diagram & System Architecture Mapping.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 902,
              dayNumber: 2,
              title: "Class 2: Operating System Functions & File Systems",
              description: "Kernel, Process Scheduling, File Allocation Tables (NTFS/FAT32), and Memory Management.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: 1,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Kernel is core OS engine.", "NTFS provides file encryption and security."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/data-processing-cycle/",
                  portalName: "GeeksforGeeks Systems Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What core component of an Operating System directly manages hardware and CPU memory?",
                  options: [{"id": 90211, "text": "Kernel", "isCorrect": true}, {"id": 90212, "text": "Web Browser", "isCorrect": false}, {"id": 90213, "text": "Text Editor", "isCorrect": false}],
                  questions: [{"id": 9021, "question": "1. What core component of an Operating System directly manages hardware and CPU memory?", "options": [{"id": 90211, "text": "Kernel", "isCorrect": true}, {"id": 90212, "text": "Web Browser", "isCorrect": false}, {"id": 90213, "text": "Text Editor", "isCorrect": false}]}, {"id": 9022, "question": "2. What Windows file system format supports large files, permissions, and encryption?", "options": [{"id": 90221, "text": "NTFS (New Technology File System)", "isCorrect": true}, {"id": 90222, "text": "FAT16", "isCorrect": false}, {"id": 90223, "text": "ASCII", "isCorrect": false}]}, {"id": 9023, "question": "3. What OS function allocates CPU time slice to multiple running applications?", "options": [{"id": 90231, "text": "Process Scheduling / Multitasking", "isCorrect": true}, {"id": 90232, "text": "Disk Defragmentation", "isCorrect": false}, {"id": 90233, "text": "Screen Saver", "isCorrect": false}]}, {"id": 9024, "question": "4. What memory management technique uses hard disk space to expand physical RAM capacity?", "options": [{"id": 90241, "text": "Virtual Memory (Paging File)", "isCorrect": true}, {"id": 90242, "text": "ROM Flash", "isCorrect": false}, {"id": 90243, "text": "Optical Cache", "isCorrect": false}]}, {"id": 9025, "question": "5. What user interface model uses windows, icons, menus, and pointers?", "options": [{"id": 90251, "text": "GUI (Graphical User Interface)", "isCorrect": true}, {"id": 90252, "text": "CLI (Command Line Interface)", "isCorrect": false}, {"id": 90253, "text": "Binary Switch", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 2: File System Comparison (NTFS vs FAT32) & OS Architecture Chart.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 903,
              dayNumber: 3,
              title: "Class 3: Computer Memory & Storage Units (Bytes to Terabytes)",
              description: "Binary math, memory units calculation, RAM vs Cache speed hierarchy.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 2,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Memory hierarchy balances speed and capacity.", "Cache L1/L2/L3 minimizes CPU wait time."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/data-processing-cycle/",
                  portalName: "GeeksforGeeks Systems Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What level of CPU cache memory is built directly inside the processor core?",
                  options: [{"id": 90311, "text": "L1 Cache (Level 1)", "isCorrect": true}, {"id": 90312, "text": "L3 Cache", "isCorrect": false}, {"id": 90313, "text": "Virtual Swap Disk", "isCorrect": false}],
                  questions: [{"id": 9031, "question": "1. What level of CPU cache memory is built directly inside the processor core?", "options": [{"id": 90311, "text": "L1 Cache (Level 1)", "isCorrect": true}, {"id": 90312, "text": "L3 Cache", "isCorrect": false}, {"id": 90313, "text": "Virtual Swap Disk", "isCorrect": false}]}, {"id": 9032, "question": "2. How many Megabytes (MB) equal 1 Gigabyte (GB)?", "options": [{"id": 90321, "text": "1024 MB", "isCorrect": true}, {"id": 90322, "text": "100 MB", "isCorrect": false}, {"id": 90323, "text": "500 MB", "isCorrect": false}]}, {"id": 9033, "question": "3. What memory type allows simultaneous read and write operations at high speed?", "options": [{"id": 90331, "text": "RAM (SRAM / DRAM)", "isCorrect": true}, {"id": 90332, "text": "PROM", "isCorrect": false}, {"id": 90333, "text": "Tape Storage", "isCorrect": false}]}, {"id": 9034, "question": "4. What storage capacity unit equals 1024 Terabytes (TB)?", "options": [{"id": 90341, "text": "Petabyte (PB)", "isCorrect": true}, {"id": 90342, "text": "Gigabyte (GB)", "isCorrect": false}, {"id": 90343, "text": "Kilobyte (KB)", "isCorrect": false}]}, {"id": 9035, "question": "5. Why is DDR4/DDR5 RAM called synchronous dynamic memory?", "options": [{"id": 90351, "text": "Synchronizes data transfers with CPU system clock", "isCorrect": true}, {"id": 90352, "text": "Never needs power", "isCorrect": false}, {"id": 90353, "text": "Uses optical light", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 3: Memory Unit Conversions & Hierarchy Pyramid Chart.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 904,
              dayNumber: 4,
              title: "Class 4: Computer Peripheral Interfacing & Expansion Buses",
              description: "PCIe slots, System buses (Address, Data, Control), Thunderbolt, and I/O controllers.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 3,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["PCI Express bus provides high bandwidth for graphics cards.", "Data bus is bidirectional."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/data-processing-cycle/",
                  portalName: "GeeksforGeeks Systems Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What modern expansion bus standard delivers ultra-fast speed for GPU cards?",
                  options: [{"id": 90411, "text": "PCI Express (PCIe x16)", "isCorrect": true}, {"id": 90412, "text": "ISA Slot", "isCorrect": false}, {"id": 90413, "text": "AGP 2x", "isCorrect": false}],
                  questions: [{"id": 9041, "question": "1. What modern expansion bus standard delivers ultra-fast speed for GPU cards?", "options": [{"id": 90411, "text": "PCI Express (PCIe x16)", "isCorrect": true}, {"id": 90412, "text": "ISA Slot", "isCorrect": false}, {"id": 90413, "text": "AGP 2x", "isCorrect": false}]}, {"id": 9042, "question": "2. Is the CPU Data Bus unidirectional or bidirectional?", "options": [{"id": 90421, "text": "Bidirectional (data flows to and from CPU)", "isCorrect": true}, {"id": 90422, "text": "Unidirectional only", "isCorrect": false}, {"id": 90423, "text": "Static constant", "isCorrect": false}]}, {"id": 9043, "question": "3. What high-speed port standard combines PCI Express and DisplayPort into USB-C cable?", "options": [{"id": 90431, "text": "Thunderbolt 4 / USB4", "isCorrect": true}, {"id": 90432, "text": "Parallel LPT", "isCorrect": false}, {"id": 90433, "text": "VGA Port", "isCorrect": false}]}, {"id": 9044, "question": "4. What specialized chip manages data exchange between CPU and peripheral devices?", "options": [{"id": 90441, "text": "I/O Controller (Southbridge / Chipset)", "isCorrect": true}, {"id": 90442, "text": "RAM Slot", "isCorrect": false}, {"id": 90443, "text": "Power Switch", "isCorrect": false}]}, {"id": 9045, "question": "5. What signal line notifies CPU processor when a peripheral needs immediate attention?", "options": [{"id": 90451, "text": "Interrupt Request Line (IRQ)", "isCorrect": true}, {"id": 90452, "text": "Audio Jack", "isCorrect": false}, {"id": 90453, "text": "Font Style", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 4: Motherboard Bus Architecture & Peripheral Controllers Worksheet.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 905,
              dayNumber: 5,
              title: "Class 5: Data Security, Backups & Disk Defragmentation",
              description: "Antivirus scanning, disk cleanup, defragmentation, firewalls, and data backup strategies.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 4,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["3-2-1 backup strategy ensures data recovery.", "Defragmentation reorganizes scattered file clusters."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/data-processing-cycle/",
                  portalName: "GeeksforGeeks Systems Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What utility reorganizes scattered file fragments on magnetic hard drives?",
                  options: [{"id": 90511, "text": "Disk Defragmenter", "isCorrect": true}, {"id": 90512, "text": "Device Manager", "isCorrect": false}, {"id": 90513, "text": "Paint Tool", "isCorrect": false}],
                  questions: [{"id": 9051, "question": "1. What utility reorganizes scattered file fragments on magnetic hard drives?", "options": [{"id": 90511, "text": "Disk Defragmenter", "isCorrect": true}, {"id": 90512, "text": "Device Manager", "isCorrect": false}, {"id": 90513, "text": "Paint Tool", "isCorrect": false}]}, {"id": 9052, "question": "2. What 3-2-1 rule represents industry best practice for data backups?", "options": [{"id": 90521, "text": "3 copies, 2 different media, 1 offsite copy", "isCorrect": true}, {"id": 90522, "text": "3 passwords, 2 usernames, 1 computer", "isCorrect": false}, {"id": 90523, "text": "Delete files every 3 days", "isCorrect": false}]}, {"id": 9053, "question": "3. What security barrier filters unauthorized network traffic entering a computer system?", "options": [{"id": 90531, "text": "Firewall", "isCorrect": true}, {"id": 90532, "text": "Disk Cleanup", "isCorrect": false}, {"id": 90533, "text": "Task Scheduler", "isCorrect": false}]}, {"id": 9054, "question": "4. What process encodes sensitive files so only authorized key holders can read them?", "options": [{"id": 90541, "text": "Data Encryption", "isCorrect": true}, {"id": 90542, "text": "File Compression", "isCorrect": false}, {"id": 90543, "text": "Format Drive", "isCorrect": false}]}, {"id": 9055, "question": "5. What utility scans for temporary junk files and clears disk space?", "options": [{"id": 90551, "text": "Disk Cleanup Utility", "isCorrect": true}, {"id": 90552, "text": "Registry Editor", "isCorrect": false}, {"id": 90553, "text": "Command Prompt", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 5: System Maintenance & Data Security Best Practices Assignment.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 906,
              dayNumber: 6,
              title: "Class 6: Chapter 1 Assessment & System Fundamentals Quiz",
              description: "Comprehensive Chapter 1 review, practical exam, system architecture mastery check.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 5,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Chapter 1 comprehensive review.", "Systems architecture self-assessment."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.geeksforgeeks.org/data-processing-cycle/",
                  portalName: "GeeksforGeeks Systems Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What volatile high-speed memory acts as a workspace for active applications?",
                  options: [{"id": 90611, "text": "RAM", "isCorrect": true}, {"id": 90612, "text": "ROM", "isCorrect": false}, {"id": 90613, "text": "DVD", "isCorrect": false}],
                  questions: [{"id": 9061, "question": "1. What volatile high-speed memory acts as a workspace for active applications?", "options": [{"id": 90611, "text": "RAM", "isCorrect": true}, {"id": 90612, "text": "ROM", "isCorrect": false}, {"id": 90613, "text": "DVD", "isCorrect": false}]}, {"id": 9062, "question": "2. What unit inside CPU carries out logical comparisons (AND, OR, NOT)?", "options": [{"id": 90621, "text": "ALU", "isCorrect": true}, {"id": 90622, "text": "Control Unit", "isCorrect": false}, {"id": 90623, "text": "System Clock", "isCorrect": false}]}, {"id": 9063, "question": "3. What program executes immediately when a computer is powered on to load OS?", "options": [{"id": 90631, "text": "Bootstrap Loader (BIOS / UEFI)", "isCorrect": true}, {"id": 90632, "text": "Web Browser", "isCorrect": false}, {"id": 90633, "text": "Word Processor", "isCorrect": false}]}, {"id": 9064, "question": "4. What bus width measurement determines how many bits CPU can transmit at once?", "options": [{"id": 90641, "text": "Bus Width (e.g. 64-bit Architecture)", "isCorrect": true}, {"id": 90642, "text": "Screen Resolution", "isCorrect": false}, {"id": 90643, "text": "Audio Bitrate", "isCorrect": false}]}, {"id": 9065, "question": "5. What utility creates exact system state restore points before updates?", "options": [{"id": 90651, "text": "System Restore Utility", "isCorrect": true}, {"id": 90652, "text": "Paint Brush", "isCorrect": false}, {"id": 90653, "text": "Notepad", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Activity 6: Chapter 1 Systems Architecture Review & Practice Assessment.",
                  pdfUrl: "/asset/9th class/Class IX â€“ Term I.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            }
          ]
        }
      ]
    },
    {
      gradeNumber: 10,
      gradeName: "Grade 10",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Chapter 1: AI Productivity & Advanced Research",
          description: "Artificial Intelligence tools, search techniques, research synthesis, and AI ethics.",
          classes: [
            {
              id: 1001,
              dayNumber: 1,
              title: "Class 1: Introduction to Artificial Intelligence Tools & Methods",
              description: "AI assistants, research synthesis, fact-checking, and workflow tools.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: null,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["AI tools assist in organizing research and summarizing complex texts.", "Always cross-verify AI generated citations."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.coursera.org/articles/ai-productivity-tools",
                  portalName: "Coursera AI Research Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What is an essential practice when using AI for academic research?",
                  options: [{"id": 100111, "text": "Fact-check citations and primary sources", "isCorrect": true}, {"id": 100112, "text": "Copy paste results without reading", "isCorrect": false}, {"id": 100113, "text": "Assume AI is always 100% accurate", "isCorrect": false}],
                  questions: [{"id": 10011, "question": "1. What is an essential practice when using AI for academic research?", "options": [{"id": 100111, "text": "Fact-check citations and primary sources", "isCorrect": true}, {"id": 100112, "text": "Copy paste results without reading", "isCorrect": false}, {"id": 100113, "text": "Assume AI is always 100% accurate", "isCorrect": false}]}, {"id": 10012, "question": "2. What phenomenon occurs when AI generates convincing but false facts?", "options": [{"id": 100121, "text": "AI Hallucination", "isCorrect": true}, {"id": 100122, "text": "System Reboot", "isCorrect": false}, {"id": 100123, "text": "Data Encryption", "isCorrect": false}]}, {"id": 10013, "question": "3. Which framework structures prompts with Role, Task, Context, and Format?", "options": [{"id": 100131, "text": "Structured Prompt Engineering Framework", "isCorrect": true}, {"id": 100132, "text": "Random Guessing", "isCorrect": false}, {"id": 100133, "text": "Binary Addition", "isCorrect": false}]}, {"id": 10014, "question": "4. Why is primary source verification necessary for AI responses?", "options": [{"id": 100141, "text": "To prevent misinformation and ensure academic accuracy", "isCorrect": true}, {"id": 100142, "text": "To decrease internet speed", "isCorrect": false}, {"id": 100143, "text": "To format fonts in bold", "isCorrect": false}]}, {"id": 10015, "question": "5. What core ethical rule governs student use of AI productivity assistants?", "options": [{"id": 100151, "text": "Transparency, original work synthesis, and proper citation", "isCorrect": true}, {"id": 100152, "text": "Plagiarizing online text directly", "isCorrect": false}, {"id": 100153, "text": "Hiding tools used", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 1 Practical: AI Tool Exploration & Fact-Checking Research Activity.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 1002,
              dayNumber: 2,
              title: "Class 2: Effective Prompt Engineering & Search Techniques",
              description: "Context setting, zero-shot/few-shot prompting, system instructions, and advanced search operators.",
              isUnlockedByAdmin: true,
              prerequisiteDayNumber: 1,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Few-shot prompting provides examples to guide model output.", "Specific constraints improve precision."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.coursera.org/articles/ai-productivity-tools",
                  portalName: "Coursera AI Research Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What prompting technique provides 2-3 input/output examples before asking a query?",
                  options: [{"id": 100211, "text": "Few-Shot Prompting", "isCorrect": true}, {"id": 100212, "text": "Zero-Shot Randomizing", "isCorrect": false}, {"id": 100213, "text": "One-Word Querying", "isCorrect": false}],
                  questions: [{"id": 10021, "question": "1. What prompting technique provides 2-3 input/output examples before asking a query?", "options": [{"id": 100211, "text": "Few-Shot Prompting", "isCorrect": true}, {"id": 100212, "text": "Zero-Shot Randomizing", "isCorrect": false}, {"id": 100213, "text": "One-Word Querying", "isCorrect": false}]}, {"id": 10022, "question": "2. What google search operator restricts search results to official government websites?", "options": [{"id": 100221, "text": "site:.gov", "isCorrect": true}, {"id": 100222, "text": "filetype:mp3", "isCorrect": false}, {"id": 100223, "text": "url:admin", "isCorrect": false}]}, {"id": 10023, "question": "3. What prompt element specifies persona e.g. 'Act as a Computer Science Professor'?", "options": [{"id": 100231, "text": "Role / Persona Definition", "isCorrect": true}, {"id": 100232, "text": "Output Format", "isCorrect": false}, {"id": 100233, "text": "Font Style", "isCorrect": false}]}, {"id": 10024, "question": "4. What search operator searches for exact match phrases enclosed in quotation marks?", "options": [{"id": 100241, "text": "\"Exact Phrase\"", "isCorrect": true}, {"id": 100242, "text": "*Wildcard*", "isCorrect": false}, {"id": 100243, "text": "#Hashtag", "isCorrect": false}]}, {"id": 10025, "question": "5. Why should system prompt constraints limit output response length?", "options": [{"id": 100251, "text": "Keeps summaries concise and avoids off-topic output", "isCorrect": true}, {"id": 100252, "text": "Turns off the computer", "isCorrect": false}, {"id": 100253, "text": "Deletes the prompt", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 2 Practical: Prompt Engineering Lab & Precision Search Assignment.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 1003,
              dayNumber: 3,
              title: "Class 3: Text Summarization & AI Note-Taking Workflows",
              description: "Synthesizing research articles, executive summaries, mind-mapping, and automated notes.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 2,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["AI summarizes long academic articles into bulleted key points.", "Mind mapping connects concepts visually."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.coursera.org/articles/ai-productivity-tools",
                  portalName: "Coursera AI Research Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What is the primary benefit of using AI text summarization for long research papers?",
                  options: [{"id": 100311, "text": "Quickly extracts key findings and core arguments", "isCorrect": true}, {"id": 100312, "text": "Deletes original papers", "isCorrect": false}, {"id": 100313, "text": "Translates to binary code only", "isCorrect": false}],
                  questions: [{"id": 10031, "question": "1. What is the primary benefit of using AI text summarization for long research papers?", "options": [{"id": 100311, "text": "Quickly extracts key findings and core arguments", "isCorrect": true}, {"id": 100312, "text": "Deletes original papers", "isCorrect": false}, {"id": 100313, "text": "Translates to binary code only", "isCorrect": false}]}, {"id": 10032, "question": "2. What note-taking format organizes main topics, sub-bullets, and action items clearly?", "options": [{"id": 100321, "text": "Structured Bullet Outline / Cornell Method", "isCorrect": true}, {"id": 100322, "text": "Unorganized Stream of Consciousness", "isCorrect": false}, {"id": 100323, "text": "Random Numbers", "isCorrect": false}]}, {"id": 10033, "question": "3. What prompt instruction asks AI to simplify complex technical text for middle schoolers?", "options": [{"id": 100331, "text": "'Explain this concept like I am 12 years old'", "isCorrect": true}, {"id": 100332, "text": "'Write in legal jargon'", "isCorrect": false}, {"id": 100333, "text": "'Use 50-word sentences'", "isCorrect": false}]}, {"id": 10034, "question": "4. What AI tool feature highlights key takeaways from PDF document uploads?", "options": [{"id": 100341, "text": "Document Analysis & Summary Extraction", "isCorrect": true}, {"id": 100342, "text": "Disk Formatting", "isCorrect": false}, {"id": 100343, "text": "Print Spooling", "isCorrect": false}]}, {"id": 10035, "question": "5. Why must students review AI-generated summary bullet points against original sources?", "options": [{"id": 100351, "text": "To verify no critical nuance or data was omitted or misconstrued", "isCorrect": true}, {"id": 100352, "text": "To change background colors", "isCorrect": false}, {"id": 100353, "text": "To make text invisible", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 3 Practical: Research Article Summarization & Cornell Note Synthesis.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 1004,
              dayNumber: 4,
              title: "Class 4: Project Planning & Automated Data Organization",
              description: "Gantt charts, project timelines, data sorting, Notion/Trello integration, and task tracking.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 3,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Gantt charts visualize project timelines and dependencies.", "Task boards track team progress."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.coursera.org/articles/ai-productivity-tools",
                  portalName: "Coursera AI Research Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What visual project management chart displays tasks along a timeline bar?",
                  options: [{"id": 100411, "text": "Gantt Chart", "isCorrect": true}, {"id": 100412, "text": "Pie Chart", "isCorrect": false}, {"id": 100413, "text": "Venn Diagram", "isCorrect": false}],
                  questions: [{"id": 10041, "question": "1. What visual project management chart displays tasks along a timeline bar?", "options": [{"id": 100411, "text": "Gantt Chart", "isCorrect": true}, {"id": 100412, "text": "Pie Chart", "isCorrect": false}, {"id": 100413, "text": "Venn Diagram", "isCorrect": false}]}, {"id": 10042, "question": "2. What digital productivity board uses To-Do, In-Progress, and Done columns?", "options": [{"id": 100421, "text": "Kanban Board (Trello / Notion)", "isCorrect": true}, {"id": 100422, "text": "Calculus Sheet", "isCorrect": false}, {"id": 100423, "text": "Terminal Shell", "isCorrect": false}]}, {"id": 10043, "question": "3. What project planning step breaks a large group project into manageable sub-tasks?", "options": [{"id": 100431, "text": "Work Breakdown Structure (WBS)", "isCorrect": true}, {"id": 100432, "text": "System Format", "isCorrect": false}, {"id": 100433, "text": "Data Erasure", "isCorrect": false}]}, {"id": 10044, "question": "4. What AI feature automates table creation from unorganized project text lists?", "options": [{"id": 100441, "text": "Structured CSV / Table Output Generation", "isCorrect": true}, {"id": 100442, "text": "Audio Equalizer", "isCorrect": false}, {"id": 100443, "text": "Font Bold", "isCorrect": false}]}, {"id": 10045, "question": "5. Why are clear milestone deadlines crucial in collaborative team projects?", "options": [{"id": 100451, "text": "Ensures accountability and keeps project progress on schedule", "isCorrect": true}, {"id": 100452, "text": "Slows down work", "isCorrect": false}, {"id": 100453, "text": "Deletes project files", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 4 Practical: Build Project Kanban Board & Milestone Timeline.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 1005,
              dayNumber: 5,
              title: "Class 5: AI Ethics, Fact-Checking & Citation Standards",
              description: "Plagiarism prevention, APA/MLA citation formatting, bias detection, and academic integrity.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 4,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Plagiarism is passing off another's work as own.", "APA/MLA standards format academic citations."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.coursera.org/articles/ai-productivity-tools",
                  portalName: "Coursera AI Research Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What is the definition of plagiarism in academic research?",
                  options: [{"id": 100511, "text": "Using someone else's work or AI generated text without attribution", "isCorrect": true}, {"id": 100512, "text": "Writing an original essay", "isCorrect": false}, {"id": 100513, "text": "Reading a textbook", "isCorrect": false}],
                  questions: [{"id": 10051, "question": "1. What is the definition of plagiarism in academic research?", "options": [{"id": 100511, "text": "Using someone else's work or AI generated text without attribution", "isCorrect": true}, {"id": 100512, "text": "Writing an original essay", "isCorrect": false}, {"id": 100513, "text": "Reading a textbook", "isCorrect": false}]}, {"id": 10052, "question": "2. What academic citation format is widely used in social sciences and tech research?", "options": [{"id": 100521, "text": "APA Format / IEEE Format", "isCorrect": true}, {"id": 100522, "text": "Comic Sans Format", "isCorrect": false}, {"id": 100523, "text": "HTML Tag Format", "isCorrect": false}]}, {"id": 10053, "question": "3. What concern arises when AI training datasets over-represent certain perspectives?", "options": [{"id": 100531, "text": "Algorithmic Bias", "isCorrect": true}, {"id": 100532, "text": "Hardware Overheating", "isCorrect": false}, {"id": 100533, "text": "High Resolution", "isCorrect": false}]}, {"id": 10054, "question": "4. How should student research reports disclose assistance from AI tools?", "options": [{"id": 100541, "text": "Include an AI Acknowledgement Statement specifying tool & prompt usage", "isCorrect": true}, {"id": 100542, "text": "Hide tool usage from teacher", "isCorrect": false}, {"id": 100543, "text": "Delete all reference notes", "isCorrect": false}]}, {"id": 10055, "question": "5. What cross-referencing strategy checks a claim against 3 independent reputable sources?", "options": [{"id": 100551, "text": "Triangulation / Multi-Source Verification", "isCorrect": true}, {"id": 100552, "text": "Single Source Trusting", "isCorrect": false}, {"id": 100553, "text": "Random Guessing", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 5 Practical: Academic Citation & AI Ethics Case Study Assignment.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            },
            {
              id: 1006,
              dayNumber: 6,
              title: "Class 6: Chapter 1 AI Research Project Presentation",
              description: "Final project synthesis, slide presentation, peer evaluation, and portfolio submission.",
              isUnlockedByAdmin: false,
              prerequisiteDayNumber: 5,
              steps: {
                step1Video: {
                  title: "Step 1: Watch Class Video",
                  description: "Watch the complete lesson video to understand class concepts.",
                  videoUrl: "https://www.youtube.com/embed/Iv8X7aLikLE"
                },
                step2TopicPdf: {
                  title: "Step 2: Review Topics Covered",
                  description: "Read detailed topic documentation and concepts.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "TOPIC COVERED.pdf",
                  keyConcepts: ["Final research synthesis demonstrates topic mastery.", "Portfolio review checks citations and quality."]
                },
                step3Website: {
                  title: "Step 3: Interactive Learning Activity",
                  description: "Interactive learning resource and activity portal.",
                  websiteUrl: "https://www.coursera.org/articles/ai-productivity-tools",
                  portalName: "Coursera AI Research Portal"
                },
                step4Quiz: {
                  title: "Step 4: Concept Check Quiz",
                  description: "Test your understanding of the class topic.",
                  passingScorePercent: 80,
                  question: "1. What component demonstrates mastery in a final AI research project presentation?",
                  options: [{"id": 100611, "text": "Clear problem statement, verified findings, and cited sources", "isCorrect": true}, {"id": 100612, "text": "Fancy animations with no facts", "isCorrect": false}, {"id": 100613, "text": "Copy pasted raw AI output", "isCorrect": false}],
                  questions: [{"id": 10061, "question": "1. What component demonstrates mastery in a final AI research project presentation?", "options": [{"id": 100611, "text": "Clear problem statement, verified findings, and cited sources", "isCorrect": true}, {"id": 100612, "text": "Fancy animations with no facts", "isCorrect": false}, {"id": 100613, "text": "Copy pasted raw AI output", "isCorrect": false}]}, {"id": 10062, "question": "2. What slide element summarizes key quantitative research statistics visually?", "options": [{"id": 100621, "text": "Infographic Data Charts", "isCorrect": true}, {"id": 100622, "text": "Wall of Plain Text", "isCorrect": false}, {"id": 100623, "text": "Empty Canvas", "isCorrect": false}]}, {"id": 10063, "question": "3. What question-and-answer session follows academic research presentations?", "options": [{"id": 100631, "text": "Defense & Peer Q&A", "isCorrect": true}, {"id": 100632, "text": "Silent Exit", "isCorrect": false}, {"id": 100633, "text": "System Reboot", "isCorrect": false}]}, {"id": 10064, "question": "4. What section at the end of a research document lists all cited reference works?", "options": [{"id": 100641, "text": "Bibliography / References List", "isCorrect": true}, {"id": 100642, "text": "Table of Contents", "isCorrect": false}, {"id": 100643, "text": "Title Page", "isCorrect": false}]}, {"id": 10065, "question": "5. What criteria evaluate research depth, logical structure, and source credibility?", "options": [{"id": 100651, "text": "Academic Assessment Rubric", "isCorrect": true}, {"id": 100652, "text": "Random Grade Generator", "isCorrect": false}, {"id": 100653, "text": "Font Size Only", "isCorrect": false}]}]
                },
                step5Task: {
                  title: "Step 5: Practical Activity & Task Submission",
                  description: "Complete practical assignment.",
                  instructions: "Class 6 Practical: AI Research Project Presentation & Final Portfolio Submission.",
                  pdfUrl: "/asset/10th class/Class X â€“ Term I syllabus structure.pdf",
                  fileName: "practical activities.pdf"
                }
              }
            }
          ]
        }
      ]
    }
  ]
};

