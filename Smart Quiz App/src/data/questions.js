const questions = [
  {id:1,question:'What number comes next in this sequence? 2, 6, 12, 20, 30, ?',options:['36','40','42','44'],answer:'42',explanation:'The differences are 4, 6, 8, 10, so the next difference is 12. Therefore 30 + 12 = 42.'},
  {id:2,question:'A farmer has 17 sheep. All but 9 run away. How many sheep are left?',options:['8','9','17','0'],answer:'9',explanation:'The phrase “all but 9” means 9 sheep remain.'},
  {id:3,question:'If all Bloops are Razzies and all Razzies are Lazzies, which statement must be true?',options:['All Lazzies are Bloops','All Bloops are Lazzies','Some Lazzies are not Razzies','No Bloops are Lazzies'],answer:'All Bloops are Lazzies',explanation:'If every Bloop is a Razzie and every Razzie is a Lazzie, every Bloop must also be a Lazzie.'},
  {id:4,question:'Which number does not belong? 3, 5, 11, 14, 17, 23',options:['5','11','14','23'],answer:'14',explanation:'The other numbers are prime. 14 is composite.'},
  {id:5,question:'If 5 machines make 5 products in 5 minutes, how long would 100 machines take to make 100 products?',options:['5 minutes','20 minutes','100 minutes','500 minutes'],answer:'5 minutes',explanation:'Each machine makes one product in 5 minutes, so 100 machines make 100 products in the same 5 minutes.'},
  {id:6,question:'What comes next? 1, 1, 2, 3, 5, 8, 13, ?',options:['18','20','21','24'],answer:'21',explanation:'Each number is the sum of the previous two. 8 + 13 = 21.'},
  {id:7,question:'A clock shows exactly 3:15. What is the angle between the hour and minute hands?',options:['0°','7.5°','15°','22.5°'],answer:'7.5°',explanation:'At 3:15, the minute hand is at 90° and the hour hand has moved 7.5° past 3, giving a 7.5° difference.'},
  {id:8,question:'A man says, “I have no brothers or sisters, but that man’s father is my father’s son.” Who is in the photograph?',options:['His father','His son','His grandfather','His uncle'],answer:'His son',explanation:'With no siblings, “my father’s son” refers to the speaker. Therefore the man in the photograph is his son.'},
  {id:9,question:'If you rearrange the letters in “LISTEN”, which word can you form?',options:['SILENT','LITTLE','LINEAR','TINSEL'],answer:'SILENT',explanation:'SILENT uses exactly the same six letters as LISTEN.'},
  {id:10,question:'A bat and a ball cost ₹110 together. The bat costs ₹100 more than the ball. How much does the ball cost?',options:['₹5','₹10','₹15','₹20'],answer:'₹5',explanation:'Let the ball cost ₹5. Then the bat costs ₹105, giving a total of ₹110.'}
];

export default questions;
