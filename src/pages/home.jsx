import React from 'react';

var CLIENT_ID = 'jIZnppdpFZEtVN8nzF5sUhq6u0hxoWGBbrIt1rTkiDE';
export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentpage:1,
            img:[]
        };
    }

    getImages(pageNo){
        fetch(`https://api.unsplash.com/search/photos?page=${pageNo}&query=india&per_page=30&client_id=${CLIENT_ID}`)
        .then(res=>res.json())
        .then(msg=>{
            const images = msg.results.map((imag)=>imag.urls.thumb)
            this.setState({img: [...this.state.img,...images], currentpage:pageNo})
        })
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillMount(){
        this.getImages(this.state.currentpage)
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }
     
    componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
    }
      
    trackScrolling = () => {
    const wrappedElement = document.getElementById('gl');
    if (this.isBottom(wrappedElement)) {
        document.removeEventListener('scroll', this.trackScrolling);
        this.getImages(this.state.currentpage+1)
    }
    };
      
    render(){


        return(
            
            <div className="container" id="gl">
            {this.state.img ?
            this.state.img.map((img, index)=>{
                return <img src={img}key={index} />})
            :null}
            </div>
        )
    }
}