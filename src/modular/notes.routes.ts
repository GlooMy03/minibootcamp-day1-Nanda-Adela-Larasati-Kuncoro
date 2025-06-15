import { Router }  from "express";

const router = Router();

router.get('/', (req,res) => {
    res.status(200).json({
        message: 'success',
        data: {
            id: 1,
            title: 'note 1'
        }
    })
})

export default router 
