import type { FAQ } from "./faqs";

export const faqsEn: FAQ[] = [
  // stitchCount
  {
    id: "1",
    category: "stitchCount",
    question: "My stitch count keeps increasing",
    answer: `【Symptom】You have more stitches than planned

【Common Causes】
• Picking up the edge stitch twice
• Increase placement is off
• Wrapping yarn around the needle too many times

【Solutions】
• Carefully check the first and last stitches of each row
• Count stitches slowly, one by one
• Re-check the increase instructions in your pattern
• Make it a habit to count stitches at the end of each row`,
  },
  {
    id: "2",
    category: "stitchCount",
    question: "My stitch count keeps decreasing",
    answer: `【Symptom】You have fewer stitches than planned

【Common Causes】
• Missing the edge stitch at the end of a row
• Accidentally skipping a stitch
• Unintentionally working a decrease (k2tog/ssk)

【Solutions】
• Always work the last stitch of each row
• Check the stitch count from the previous row before starting
• Work slowly and check each stitch carefully
• Use stitch markers to help track your place`,
  },
  {
    id: "3",
    category: "stitchCount",
    question: "I can't find where I made a mistake",
    answer: `【How to Check】
1. Lay your knitting flat and look at the whole piece
2. Recount your stitches
3. Check one row at a time from the previous row
4. When you find the error, rip back to one row before it

【Prevention】
• Check stitch count every 5 rows
• Use stitch markers for complex patterns
• Use this app's counter feature
• Use the memo feature to note "OK up to here"`,
  },
  {
    id: "4",
    category: "stitchCount",
    question: "I've lost track of the beginning and end of a row",
    answer: `【How to Tell】
• Looking from the cast-on side, the right side is the row start (Japanese method)
• Using a row marker makes it easy to identify
• Use the yarn tail direction as a guide

【Solutions】
• Going forward, attach a stitch marker at the beginning of each row
• Remember which direction you're knitting (e.g., right to left)
• Follow the yarn path to trace back`,
  },
  {
    id: "5",
    category: "stitchCount",
    question: "Stitch count is correct but the shape looks wrong",
    answer: `【Possible Causes】
• Mixing up right side and wrong side
• Inconsistent stitch orientation
• Uneven tension

【How to Check】
• Verify you're using the correct stitch method as per pattern
• Check knit/purl stitch orientation
• Review stitch size consistency

【Solutions】
• Knit slowly and carefully
• Relax and release tension
• Knit a few rows to get into the rhythm`,
  },

  // technique
  {
    id: "6",
    category: "technique",
    question: "I can't tell knit stitches from purl stitches",
    answer: `【How to Tell】

■ Knit Stitch
• Looks like a V shape (∧)
• Smooth surface
• Generally called the "right side"

■ Purl Stitch
• Looks like a horizontal bump (—)
• Bumpy surface
• Generally called the "wrong side"

【How to Check】
1. Look at the knitted fabric from the front
2. Check the shape of each stitch
3. Look in good lighting

【Tips】
• Hold your knitting up to the light to see it better
• Practice with larger needles and thicker yarn
• Knit a few rows to memorize the pattern`,
  },
  {
    id: "7",
    category: "technique",
    question: "My tension is too tight or too loose",
    answer: `【If Too Tight】
• Go up 1-2 needle sizes
• Consciously relax your grip
• Knit more slowly
• Let your hands and shoulders relax

【If Too Loose】
• Go down 1-2 needle sizes
• Pull yarn slightly snugger
• Practice maintaining consistent tension

【General Advice】
• Tension often evens out naturally after a few rows
• Knit without tension, stay relaxed
• Take breaks during long knitting sessions
• Don't worry too much about minor irregularities at first`,
  },
  {
    id: "8",
    category: "technique",
    question: "I made a mistake but don't know how to undo it",
    answer: `【For 1-2 Stitches (Tinking)】
1. Remove the needle
2. Gently undo one stitch at a time
3. Be careful not to drop stitches
4. Return to the needle

【To Go Back Several Rows】
1. Go back to one row before the mistake
2. Remove the needle
3. Gently pull yarn to unravel
4. Pick up the stitches again

【Frogging (Large Sections)】
1. Insert needle before the error point
2. Confidently unravel to that needle
3. Pick up the stitches again

【Tips】
• Don't rush - take it slow
• Work in good lighting
• Be careful not to drop stitches
• Gently stretch the unraveled yarn to remove kinks`,
  },
  {
    id: "9",
    category: "technique",
    question: "I don't know which direction to wrap the yarn around the needle",
    answer: `【Basic Rule】
• From front to back (clockwise)
• Wrap yarn over the top of the needle

【For Knit Stitch】
1. Insert right needle into left needle stitch
2. Wrap yarn around needle (front to back)
3. Pull through

【For Purl Stitch】
1. Insert right needle into left needle stitch (from front)
2. Wrap yarn around needle (back to front)
3. Pull through

【Tips】
• Watch a video for visual reference
• Check each step slowly
• Practice repeatedly`,
  },
  {
    id: "10",
    category: "technique",
    question: "My row heights are uneven",
    answer: `【Causes】
• Inconsistent tension throughout
• Different tension at row start vs end
• Changing posture while knitting

【Solutions】
• Knit in the same posture
• Knit at the same time of day (fatigue affects tension)
• Maintain consistent yarn tension
• Knit in a relaxed state

【Long-term Improvement】
• Keep practicing
• Learn your own knitting habits
• Take regular breaks`,
  },

  // pattern
  {
    id: "11",
    category: "pattern",
    question: "I don't know where to start reading a crochet chart",
    answer: `【Basic Rules (Japanese Method)】
• Read right to left
• Work rows from bottom to top
• For flat knitting, alternate directions

【For Working in the Round】
• Work counterclockwise
• Always read right to left

【Key Points to Check】
• Find the cast-on position (usually bottom right)
• Follow arrows if present
• Check row numbering

【Tips】
• Take the first row slowly and check carefully
• Refer to the symbol dictionary when unsure
• Take notes as you go`,
  },
  {
    id: "12",
    category: "pattern",
    question: "I don't understand repeat symbols in patterns",
    answer: `【Examples】
"Repeat *...* 3 times"
→ Work the stitches between * three times

"Repeat [ ] 4 times"
→ Work the stitches inside [ ] four times

【Important Notes】
• Check total stitch count after repeats
• Be clear about where repeats start and end
• Calculate total stitches for the whole row

【Tips】
• Check through the first repeat carefully
• Use a counter app to track repeat number
• Write "Repeat #___" in your notes`,
  },
  {
    id: "13",
    category: "pattern",
    question: "I don't know what this symbol means",
    answer: `【Solutions】
1. Open the "Symbols" tab in this app
2. Search for the symbol
3. Read the detailed description
4. Add it to favorites for easy access

【If Still Unclear】
• Check the symbol key in your pattern
• Read the written instructions in the pattern
• Search online
• Ask in a knitting community

【Prevention】
• Memorize commonly used symbols
• Note new symbols as you encounter them
• Use the favorites feature in this app`,
  },
  {
    id: "14",
    category: "pattern",
    question: "I don't know how to adjust the size of a pattern",
    answer: `【Basic Concept】
• Check gauge (stitch/row count per 10cm square)
• Adjust by increasing/decreasing stitch and row counts

【To Make Larger】
• Use larger needles
• Increase stitch count
• Add more rows

【To Make Smaller】
• Use smaller needles
• Decrease stitch count
• Work fewer rows

【Important Notes】
• Always swatch to check your gauge
• Choose needles that match your yarn weight
• Maintain pattern proportions`,
  },
  {
    id: "15",
    category: "pattern",
    question: "My knitted fabric doesn't match the pattern",
    answer: `【Things to Check】
1. Is your gauge correct?
2. Are you reading the symbols correctly?
3. Is your knitting direction correct?
4. Do stitch and row counts match?

【Common Causes】
• Wrong gauge (needle size, yarn weight)
• Misreading symbols
• Incorrect placement of increases/decreases
• Different tension

【Solutions】
• Redo your gauge swatch
• Check the pattern from the beginning
• Work one row at a time carefully
• Compare with photos as you progress`,
  },

  // other
  {
    id: "16",
    category: "other",
    question: "I'm totally lost and exhausted",
    answer: `【Diagnosis】You've got a case of "trying too hard" syndrome.

【Prescription】
• Quietly set your knitting down on the table
• Make yourself a warm drink
• Stare into space for 5 minutes
• Pet a cat if you have one (imagine it if you don't)
• Say "Oh well, it's fine" out loud

【Important Notes】
• Your knitting will wait patiently for you
• Nobody will scold you for making mistakes
• Even if you're the worst knitter in the world, if you're having the most fun, that's all that matters

【If That Still Doesn't Help】
• Get some sleep
• Tomorrow's you will definitely be better than today's`,
  },
];
