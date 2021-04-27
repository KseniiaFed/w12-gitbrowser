// import React, { useState } from 'react'

// const TaskManager = () => {
//   const [text, setText] = useState('')
//   const [textServer, setTextServer] = useState('')

//   const sendText = () => {
//     fetch('/api/v1/tasks/category',  {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ input: text })
//     })
//       .then((res) => res.json())
//       .then((data) => setTextServer(data.result))
//   }
//   return (
//     <div>
//       <div className="border-red-500">
//         <input
//           type="text"
//           value={text}
//           className="border-2"
//           onChange={(e) => {
//           setText(e.target.value)
//         }} />
//         <button type="button" onClick={sendText}>Send</button>
//       </div>
//       <div className="border border-black text-black bg-white w-44 h-12">{textServer}</div>
//     </div>
//   )
// }

// export default TaskManager


// const task = {
//       taskId: '2WEKaVNO',  // shortid.generate(),
//       title: 'Task', // имя таска
//       _isDeleted: false, // флаг удален ли таск. Физичически мы таски не удаляем, только помечаем что удален
//       _createdAt: 141352356, // read utc format ( +new Date() )
//       _deletedAt: 141352356, // read utc format ( +new Date() )
//       status: 'done'  // ['done', 'new', 'in progress', 'blocked']
//   }

