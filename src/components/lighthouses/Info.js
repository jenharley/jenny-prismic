const Info = (props) => {
    const {info} = props;
    const { name, description } = info.properties;
  
    return (
      <div>
        <div>
          {name} |{' '}
          <a
            target="_new"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${name}`}
          >
            Wikipedia
          </a>
        </div>
        <p style={{ width: 240 }}>{description}</p>
        <img width={240} src={info.properties.image.url} alt="" />
      </div>
    );
}

export default Info;