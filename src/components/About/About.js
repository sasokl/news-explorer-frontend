function About() {
  return (
    <section className='about'>
      <img src={require('../../images/avatar.jpg')} alt="developer\'s avatar" className="about__avatar"/>
      <div className="about__info-container">
        <h2 className="about__info-title">About the author</h2>
        <p className="about__info-text">
          Hi, I'm Alex. As a graduate of the web-developer course Practicum by Yandex and Masterschool , I 'm glad to introduce my diploma
          project. <br/><br/>My recently-finished web developer internship experience has shaped my code evaluation and website development knowledge,
          and I know I have the MERN skills which helps me to solutions succeed.<br/><br/>
          During my learning I reached numerous skills and strengthened existing abilities, all which would serve me well in my future career.
        </p>
      </div>
    </section>
  );
}

export default About;
