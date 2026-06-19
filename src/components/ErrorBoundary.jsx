import React from 'react'

export default class ErrorBoundary extends React.Component{
  constructor(props){
    super(props)
    this.state = {error: null}
  }
  static getDerivedStateFromError(error){
    return {error}
  }
  componentDidCatch(error, info){
    console.error('Captured error in ErrorBoundary', error, info)
  }
  render(){
    if(this.state.error){
      return (
        <div className='container py-12 text-center'>
          <h2 className='text-xl font-semibold'>Something went wrong</h2>
          <p className='text-sm text-gray-500 mt-2'>An error occurred while rendering the page. Check the console for details.</p>
        </div>
      )
    }
    return this.props.children
  }
}
