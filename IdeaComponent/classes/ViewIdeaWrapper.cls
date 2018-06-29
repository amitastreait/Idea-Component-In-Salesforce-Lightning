public with sharing class ViewIdeaWrapper {
    @AuraEnabled
    public Idea idea { get; set; }
    @AuraEnabled
    public List<IdeaComment> ideaCommentList { get; set; }
    
    public ViewIdeaWrapper(Idea idea, List<IdeaComment> ideaCommentList){
        this.idea = idea;
        this.ideaCommentList = ideaCommentList;
    }
}