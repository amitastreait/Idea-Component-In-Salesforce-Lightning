({
    doInit : function(component, event, helper) {
        var action = component.get('c.CommunityForIdea');
        component.set('v.isSending',true);
        action.setCallback(this,function(response){
            var state = response.getState();
            var zoneOptions =[];
            var zoneComponent = component.find('zone');
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.isSending',false);
                var result = response.getReturnValue();
                for(var i = 0; i < result.length; i++){
                    zoneOptions.push({label:result[i].split('####')[1],value:result[i].split('####')[0]});
                }
                zoneComponent.set('v.options',zoneOptions);
            }else if(state === 'ERROR'){
                console.log(response.error);
            }else{
                console.log('UNKNOWN ERROR');
            }
        });
        $A.enqueueAction(action);
    },
	showAllIdeas : function(component, event, helper) {
		var action = component.get('c.AllIdeas');
        var pageSize = component.get("v.pageSize");
        component.set('v.isSending',true);
        action.setParams({
            "CommunityId" :  component.find('zone').get('v.value')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.isSending',false);
                var result = response.getReturnValue();
                component.set('v.ideaListToShow',result);
                
                component.set("v.totalIdeas", component.get("v.ideaListToShow").length);
                component.set("v.startPage",0);
                component.set("v.endPage",pageSize-1);
                
                var ideaPaginationList = [];
                for(var i=0; i< pageSize; i++)
                {
                    if(component.get("v.ideaListToShow").length> i)
                        ideaPaginationList.push(result[i]);    
                }
                component.set('v.ideaPaginationList', ideaPaginationList);
                console.log('Pagination '+component.get('v.ideaPaginationList'));
            }else if(state === 'ERROR'){
                console.log(response.error);
            }else{
                console.log('UNKNOWN ERROR');
            }
        });
        $A.enqueueAction(action);
	},
    showRecentIdeas : function(component, event, helper){
        helper.recentIdeas(component);
    },
    showTopIdeas : function(component, event, helper){
        helper.TopIdeas(component);
    },
    showIdeasComment : function(component, event, helper){
        helper.IdeasComment(component);
    },
    addCommentToIdea : function(component, event, helper){
        
    }, 
    closeModal : function(component, event, helper){  
        helper.closeModal(component, event);
    },
    openModal : function(component, event, helper){  
        helper.openModal(component, event);
    },
    updateIdeaList : function(component, event, helper){ 
        var communityId = component.find('zone').get('v.value');
        helper.updateIdeaList(component, communityId);
    },
    refreshPage : function(component, event, helper){ 
        console.log('event fired');
        helper.closeModal(component, event);
        $A.get('e.force:refreshView').fire();
    },
    previous : function(component, event, helper){ 
        helper.previous(component, event);
    },
    next : function(component, event, helper){ 
        helper.next(component, event);
    },
    viewIdea : function(component, event, helper){ 
        helper.displayIdea(component, event);
    },
})