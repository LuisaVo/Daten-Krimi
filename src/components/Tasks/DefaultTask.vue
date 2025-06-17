<template>
    <!-- First Grid -->
    <div class="w3-row-padding w3-padding-64 w3-container">
        <div class="w3-content">
        <div>
            <slot name="description"></slot><!-- for the description of the task -->
        </div>
        <div class="w3-third w3-center">
            <p class="w3-text-grey">
            <slot name="use"></slot><!-- for explanation how to use it --></p>
        </div>
    
        <div class="w3-twothird w3-center">
            <slot name="chart"></slot> <!-- Slot for a custom chart -->
        </div>
        </div>
    </div>
    
    <!-- Second Grid -->
    <div class="w3-row-padding w3-light-grey w3-padding-64 w3-container">
        <div class="w3-content">
        <div class="w3-third w3-center">
            <i class="fa fa-lightbulb-o w3-padding-64 w3-text-red w3-margin-right"></i>
        </div>
    
        <div class="w3-twothird">
            <slot name="explanation"></slot><!-- for the explanation of the task -->
        </div>
        </div>
    </div>
    
    <div class="w3-container w3-black w3-center w3-opacity w3-padding-64">
        <h1 class="w3-margin w3-xlarge">Quote of the day: live life</h1>
    </div>
</template>
