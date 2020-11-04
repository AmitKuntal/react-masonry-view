import React from 'react';
import Image from './components/image';
import {Modal} from './components/modal';
var CLIENT_ID = 'jIZnppdpFZEtVN8nzF5sUhq6u0hxoWGBbrIt1rTkiDE';

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentpage:1,
            img:[],
            showModal:false
        };
    }

    getImages(pageNo){
        fetch(`https://api.unsplash.com/search/photos?page=${pageNo}&query=india&per_page=30&client_id=${CLIENT_ID}`)
        .then(res=>res.json())
        .then(response=>{
            const images = response.results.map((imag)=>imag.urls.thumb)
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

    openPopUp=(e)=>{
        this.setState({currnetImage : parseInt(e.target.getAttribute('data-index')),showModal:true})
    }

    hideModal=()=>{
        this.setState({showModal:false})
    }

    nextImage=()=>{
        if(this.state.currnetImage <this.state.img.length){
        
        const next = this.state.currnetImage + 1
        this.setState({currnetImage:next})
        }
    }
      
    
    previousImage=()=>{
        if(this.state.currnetImage >0){
            const next = this.state.currnetImage - 1
            this.setState({currnetImage:next})
    }
    }

    render(){
        return(
            
            <div className="container" id="gl">
            {this.state.img ?
            this.state.img.map((img, index)=>{
                return <Image img={img} key={index} index={index} handleClick={this.openPopUp}/>})
            :null}

            <Modal show={this.state.showModal} handleClose={this.hideModal}>
                <img src={this.state.img[this.state.currnetImage]} alt={this.state.currnetImage}/>
                <button onClick={this.previousImage}>Previous</button>
                <button onClick={this.nextImage}>Next</button>
            </Modal>
            </div>
        )
    }
}