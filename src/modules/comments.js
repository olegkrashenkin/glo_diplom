'use strict'

export { showComments }

const showComments = () => {
    const commentsContainer = document.querySelector('.comments-container')
    commentsContainer.innerHTML = ''
    fetch('../comments.json')
        .then(res => res.json())
        .then(data => data.comments)
        .then(commentsList => {
            let left = true, id = 0, isOrange = true

            const createCommItem = (data) => {
                const newComm = document.createElement('div')
                const img = 'images/users/' + (data.image || 'noimage.png')

                newComm.classList.add('review-margin-bottom', 'row', 'comment-item')

                if (left) {
                    const color = isOrange ? 'review-green' : 'review-orange'

                    newComm.innerHTML = `
                        <div class="col-xs-3 col-sm-2">
							<div class="review-user">
								<img src="${img}" alt="" class="img-responsive avatar">
							</div>
						</div>
						<div class="col-xs-9 col-sm-9">
							<div class="review-inner ${color} review-arrow review-arrow-left">
								<p class="text-normal">${data.author}</p>
								<p>${data.comment}</p>
							</div>
						</div>`

                    isOrange = !isOrange
                } else {
                    newComm.innerHTML = `
                        <div class="col-xs-9 col-sm-9">
                            <div class="review-inner review-gray review-arrow review-arrow-right">
                                <p class="text-normal">${data.author}</p>
                                <p>${data.comment}</p>
                            </div>
                        </div>
                        <div class="col-xs-3 col-sm-2">
                            <div class="review-user">
                                <img src="${img}" alt="" class="img-responsive avatar">
                            </div>
                        </div>`
                }
                commentsContainer.append(newComm)

                left = !left
            }

            while (id < 3) {
                createCommItem(commentsList[id])
                id++
            }
            console.log(commentsList);

            setInterval(() => {
                if (id === commentsList.length - 1) id = 0
                commentsContainer.querySelector('.comment-item').remove()
                createCommItem(commentsList[id])
                id++
            }, 20000)

        })
}