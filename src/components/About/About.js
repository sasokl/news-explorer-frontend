function About() {
  return (
    <section className='about'>
      <img src={require('../../images/avatar.jpg')} alt="developer\'s avatar" className="about__avatar"/>
      <div className="about__info-container">
        <h2 className="about__info-title">About the author</h2>
        <p className="about__info-text">
          This block describes the project author. Here you should indicate your name, what you do, and which
          development technologies you know.<br/><br/>

          You can also talk about your experience with Practicum, what you learned there, and how you can help potential
          customers.
        </p>
      </div>
    </section>
  );
}

export default About;