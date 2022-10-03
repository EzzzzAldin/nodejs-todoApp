$(document).ready(function () {
    $('.toggle-todo-status').on('change', function () {
        let status = $(this).is(':checked');
        let parent = $(this).parents('.todo-item');
        
        if (status) {
            parent.addClass('completed');
        } else {
            parent.removeClass('completed');
        }
    })
    
    $('.mark-todo-as-completed').on('click', function () {
        $('.todo-item').addClass('completed');
    })
    
    $('.mark-todo-as-un-completed').on('click', function () {
        $('.todo-item').removeClass('completed');
    })
    $('.deleteBtn').on('click', function(event) {
        if( !confirm('Are You Sure ?')) {
            event.preventDefault();
        }
    })
    
})