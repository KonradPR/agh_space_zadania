let express = require('express');
let test = require('./DataSchema');
const router = express.Router();


router.get('/getAll', (req,res)=>{
  test.find({},(err, tests) => {
            res.json(tests)
        })

})

router.get('/get/:id', (req,res)=>{
  test.findById(req.params.id,(err,result)=>{
    res.json(result)
  })
})


router.post('/addOne', (req,res)=>{
  if(!req.body) {
      return res.status(400).send('Request body is missing')
    }


    let model = new test(req.body)
    model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


router.post('/delete/:id', (req,res)=>{
  test.findByIdAndRemove(req.params.id, (error, data)=>{
        if(error){
            res.status(500).send('Internal error');
        } else {
            res.status(204);

        }
    });


})


module.exports = router
