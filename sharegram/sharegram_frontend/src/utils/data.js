export const userQuery = (userId) => {
    const query = `*[_type == 'user' && _id == '${userId}']`;

    return query;
}

export const searchTerms = (search) => {
    const query = `*[_type == 'pin' && Title match '${search}' || About match '${search}' ||Category match '${search}' 
                        {
                            image{
                                asset->{
                                  url
                                }
                              },

                            _id,
                            destination,
                            postedBy->{
                            _id,
                            userName,
                            image
                            },

                            save[]{
                            _key,
                            postedBy->{
                                _id,
                                userName,
                                image
                            },
                            },
                        }]`

    return query;
}

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

    
