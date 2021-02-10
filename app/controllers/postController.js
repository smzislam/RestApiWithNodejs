const Post = require('../models/PostModel');
const {postValidation} =require('../validation/validation');

module.exports = {
    getAllPosts: async (req, res) => {

        try{
            const posts = await Post.find();
            res.json(posts);

        }catch(error){
            res.json({message:error});
        }

        //or
        // Post.find().then(posts=>{
        //     res.json(posts);
        // })
        // .catch(error=>{
        //     res.json({message:error})
        // });

        
    },
    createPost:async (req, res) => {
        //res.send('create post')

        //validate post data
        const validation = postValidation(req.body);
        if(validation.error) return res.status(400).json(validation.error.details[0].message);


        const newPost = new Post({
            title: req.body.title,
            description: req.body.description
        });
        try{
            const post= await newPost.save(); 
            return res.json(post);
        }catch(err){
            return res.json({message:err});
        }

        // newPost.save()
        //     .then(data=>{
        //         res.json(data);
        //     })
        //     .catch(err=>{
        //         res.json({message:err});
        //     });
        
    },
    getSinglePost:(req, res) => {
        //res.send('get single post')
        const postId = req.params.id;
        Post.findById(postId).then(post=>{
            res.json(post);
        })
        .catch(error=>{
            res.json({message:error})
        });
    },
    // updatePost:(req, res) => {
    //     //res.send('update post')
    //     const postId = req.params.id;
    //     Post.updateOne({_id:postId}, {$set:{title:req.body.title, description: req.body.description}})
    //         .then(updatedPost=>{
    //             res.json(updatedPost);
    //         }).catch(error=>{
    //             res.json({message:error});
    //         });
    // },
    // updatePost: (req, res) => {
		
	// 	const postId = req.params.id;
	// 	Post.findById(postId).then(post=>{	
	// 		post.title= req.body.title;
    //         post.description= req.body.description;
	// 		post.save()
    //             .then(updatedPost=>{
    //                 res.json(updatedPost);
    //             }).catch(error=>{
    //                 res.json({message:error});
    //             });
			
	// 	});																		
		
	// },
    updatePost: async (req, res) => {

        //validate post data
        const validation = postValidation(req.body);
        if(validation.error) return res.status(400).json(validation.error.details[0].message);
		
		const postId = req.params.id;
        try{
		const post= await Post.findById(postId);

            post.title= req.body.title;
            post.description= req.body.description;
			post.save();
        	
            res.json(post);

        }catch(error){
            res.json({message:error});
        }																	
		
	},
    deletePost:(req, res) => {
        const postId = req.params.id;
        //Post.remove({_id:postId})
        Post.findByIdAndDelete(postId)
            .then(deletedPost=>{
                res.json(deletedPost);
            }).catch(error=>{
                res.json({message:error});
            });
    }
}

