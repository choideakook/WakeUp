const User = require('../../models/user');

exports.join = async (userData) => {
    const user = new User({
        username: userData.id,
        nickname: userData.properties.nickname,
        img: userData.properties.profile_image,
        provider: 'KAKAO',
        role: ['MEMBER'],
        wallet: {
            cash: 0,
            coin: 10000
        },
        createDate: new Date()
    });

    await user.save()
        .then(saveUser => console.log('user 정보 저장 성공'))
}