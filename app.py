from resources.Transcriber import convertText
from resources.NLP_engine import getScore
from resources.slicer import sliceAudio
from resources.getAnswers import getAnswers
import time
# from resources.voicefrommeet import recordAudio
from resources.record_audio import record
def banner(text):
    # for loging
    print(f"!! {text} !!\n")
    

def main():
    
    print("Main")
    path = r"D:\Projects and codes\interview\resources\extenion_interview\out.wav"
    
    # slicing
    banner("Spliting audio")
    
    list_paths = sliceAudio(path=path)
        
    banner('Done')
    print(list_paths)
    
    banner("converting audio to txt")
    givenAnsDB = []
    for i in range(0,len(list_paths)):
        
        text = convertText(list_paths[i])
        givenAnsDB.append(text)
        
    print(givenAnsDB)
    
    banner("Done") if len(givenAnsDB) == len(list_paths) else banner("Fatal error : Can't convert given part of audio")
    # # for j in range(len(audio_text)):
    #     # 
    #     # print(f"Result {j} :",audio_text[j])
    # while True:
        
    #     try:
    #         banner("Getting answers")
    #         answerDB = []
    #         questionsDB = ["what is machine learning","what is artificial intelligence","what is data science","what is data structure","what is deep learning"]
    #         for i in range(0,len(questionsDB)):
                
    #             temp_list = getAnswers(questionsDB[i])
    #             answerDB.append(temp_list)
    #             # print(answerDB) 
    
    #         break # break out of the while loop if the try block is successful
    #     except:
    #         banner("<Network Error>")
    #         waiting_time = 20
    #         print(f"Waiting for {waiting_time} seconds...", end='')
    #         for i in range(waiting_time, -1, -1):
    #             print(f"\r{i} seconds remaining...{' '*(len(str(waiting_time))-len(str(i)))}", end='')
    #             time.sleep(1)
    #         banner("Retrying")
    #     banner("Done")
        

    # banner("Comparing for score")
    
    # ansScores = []
    
    # for k in range(0,(len(answerDB)-2)):
    #     temp = getScore(answerDB[k],givenAnsDB[k])
    #     ansScores.append(temp)
    #     # print(givenAnsDB[k])
        
    # total = 0
    # for l in range(0,len(ansScores)):
    #     total += ansScores[l]
        
    # totalScore = total/len(ansScores)
    # print(totalScore,"\n")
    # banner("Done 100%")
    

if __name__ == "__main__":
    main()
    