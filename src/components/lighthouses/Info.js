const Info = (props) => {
    const {info} = props;
    const name = info.properties.name;
  
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
        <img width={240} src={info.properties.image.url} alt="" />
      </div>
    );
}

export default Info;