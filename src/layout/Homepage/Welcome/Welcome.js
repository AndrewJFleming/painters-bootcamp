import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap';
import './Welcome.css'

const Welcome = () => {

  return (
        <Jumbotron fluid className="jumbo">
            <Container>
                <h1>Painter's Bootcamp</h1>
                <p>
                Have you ever wanted to learn to paint but neglected to start because you felt that you didn't have enough talent?
                </p>
                <p>                
                Though talent is a factor in producing original imagery, much of what makes a painting appealing to the eye lies in the color palette, the arrangement of the forms in the scene as well as the balance between light and dark; All of these mechanics can be practiced and mastered. I'll bet you really do have some fantastic images in your mind so lets hone those skills so you can present your vision in the best possible light.
                </p>
            </Container>
        </Jumbotron>
  );
}

export default Welcome;